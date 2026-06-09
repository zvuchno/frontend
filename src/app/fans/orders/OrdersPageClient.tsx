"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getOrdersWithDetails, type StoreOrderDetail } from "@/api/store";
import { OrderCardListener } from "@/widgets/profile";
import styles from "./ordersPageClient.module.scss";

const FALLBACK_PRODUCT_IMAGE = "/images/favorite-cassette.png";

export function OrdersPageClient() {
  const { status } = useSession();
  const [orders, setOrders] = useState<StoreOrderDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let isCurrentRequest = true;

    const loadOrders = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const orderDetails = await getOrdersWithDetails();

        if (isCurrentRequest) {
          setOrders(orderDetails);
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setErrorMessage(
            requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить заказы",
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    void loadOrders();

    return () => {
      isCurrentRequest = false;
    };
  }, [status]);

  if (status !== "authenticated" || isLoading) {
    return <p className={styles.stateMessage}>Загрузка заказов...</p>;
  }

  if (errorMessage) {
    return <p className={styles.stateMessage}>{errorMessage}</p>;
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
          itemsCount={order.items_count}
          totalPrice={Number(order.total)}
          previewItems={order.items.slice(0, 3).map((item) => ({
            id: item.sku || item.target_url,
            src: item.image || FALLBACK_PRODUCT_IMAGE,
            title: item.name,
          }))}
          onDetailsClick={() => undefined}
        />
      ))}
    </div>
  );
}
