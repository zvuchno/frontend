"use client";

import { getArtistOrders } from "@/api/artist/ordersApi/getArtistOrders";
import { type TArtistOrder } from "@/api/artist/ordersApi/types";
import { type PaginatedStoreResponse } from "@/api/store/types";
import { Loader, Title } from "@/shared/ui";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import s from "./OrdersPageArtist.module.scss";
import { CardOrderArtist } from "@/widgets/orders";
import { ORDER_STATUS_TRANSLATIONS } from "@/shared/constants/translations";
import { getRelativeDateLabel } from "@/shared/utils/getRelativeDateLabel";

export function OrdersPageArtist() {
  const { status } = useSession();

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    PaginatedStoreResponse<TArtistOrder>,
    Error,
    InfiniteData<PaginatedStoreResponse<TArtistOrder>>
  >({
    queryKey: ["orders", "artist"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getArtistOrders(url);
      return getArtistOrders();
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
  });

  const orders = data?.pages.flatMap((page) => page.results) ?? [];
  const grouped = groupOrdersByDate(orders);

  if (status !== "authenticated" || isLoading) {
    return <Loader />
  }

  if (error) {
    return <p className={s.stateMessage}>{error.message}</p>;
  }

  if (orders.length === 0) {
    return <p className={s.stateMessage}>Заказов пока нет</p>;
  }

  return (
    <div className={s.container}>
      {grouped.map((group, index) => (
        <section key={index} className={s.section}>
          <Title Tag="h3" className={s.sectionHeader}>{group.label}</Title>
          <div className={s.section}>
            {group.orders.map((order) => (
              <CardOrderArtist
                key={order.id}
                orderId={order.id}
                orderNumber={order.order_number}
                statusLabel={ORDER_STATUS_TRANSLATIONS[order.status]}
                totalPrice={Number(order.total)}
                orderDate={new Date(order.created_at)}
                // onAccepted={() => undefined}
                // onRejected={() => undefined}
              />
            ))}
          </div>
        </section>
      ))}
      {hasNextPage && (
        <div className={s.buttonWrapper}>
          <button
            type="button"
            className={s.button}
            onClick={() => {
              fetchNextPage().catch(console.error)
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "загрузка..." : "смотреть ещё"}
          </button>
        </div>
      )}
    </div>
  );
};

interface GroupedOrder {
  label: string;
  orders: TArtistOrder[];
}

function groupOrdersByDate(orders: TArtistOrder[]): GroupedOrder[] {
  if (!orders.length) return [];

  // Сначала сортируем по дате (новые сверху)
  const sorted = [...orders].sort((a, b) => {
    const da = new Date(a.created_at).getTime();
    const db = new Date(b.created_at).getTime();
    return db - da; // от новых к старым
  });

  const grouped: GroupedOrder[] = [];
  let currentLabel: string | null = null;
  let currentGroup: TArtistOrder[] = [];

  for (const order of sorted) {
    const label = getRelativeDateLabel(order.created_at);

    if (currentLabel === null || currentLabel !== label) {
      if (currentGroup.length > 0) {
        grouped.push({ label: currentLabel!, orders: currentGroup });
      }
      currentLabel = label;
      currentGroup = [order];
    } else {
      currentGroup.push(order);
    }
  }

  if (currentGroup.length > 0 && currentLabel) {
    grouped.push({ label: currentLabel, orders: currentGroup });
  }

  return grouped;
};