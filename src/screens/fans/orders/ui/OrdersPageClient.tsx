"use client";

import { useSession } from "next-auth/react";

import { getOrders } from "@/api/store";
import { OrderCardListener } from "@/widgets/profile";
import styles from "./ordersPageClient.module.scss";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type PaginatedStoreResponse, type StoreOrder } from "@/api/store/types";
import { Loader } from "@/shared/ui";
import { ORDER_STATUS_TRANSLATIONS } from "@/shared/constants/translations";

export function OrdersPageClient() {
  const { status } = useSession();

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    PaginatedStoreResponse<StoreOrder>,
    Error,
    InfiniteData<PaginatedStoreResponse<StoreOrder>>
  >({
    queryKey: ["orders", "listener"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getOrders(url);
      return getOrders();
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
  });

  const orders = data?.pages.flatMap((page) => page.results) ?? [];

  if (status !== "authenticated" || isLoading) {
    return <Loader />
  }

  if (error) {
    return <p className={styles.stateMessage}>{error.message}</p>;
  }

  if (orders.length === 0) {
    return <p className={styles.stateMessage}>Заказов пока нет</p>;
  }

  return (
    <div className={styles.container}>
      {orders.map((order) => (
        <OrderCardListener
          key={order.id}
          orderId={order.id}
          orderNumber={order.order_number}
          statusLabel={ORDER_STATUS_TRANSLATIONS[order.status]}
          totalPrice={Number(order.total)}
          orderDate={new Date(order.created_at)}
          images={order.images}
        />
      ))}
      {hasNextPage && (
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.button}
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
}
