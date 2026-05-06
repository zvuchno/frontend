"use client";

import { OrderCardListener } from "@/widgets/profile/ui/OrderCardListener/OrderCardListener";
import styles from './ordersPageClient.module.scss'

export function OrdersPageClient() {
  const mockOrders = [
    {
      orderId: 12124245,
      orderNumber: 12124245,
      itemsCount: 3,
      totalPrice: 1289,
      previewItems: [
        { id: 1, src: "/cassette.png", title: "title" },
        { id: 2, src: "/cassette.png", title: "title" },
        { id: 3, src: "/cassette.png", title: "title"}
      ],
      onDetailsClick: () => {}
    },
    {
      orderId: 121242456,
      orderNumber: 12124245,
      itemsCount: 3,
      totalPrice: 1289,
      previewItems: [
        { id: 1, src: "/cassette.png", title: "title" },
        { id: 2, src: "/cassette.png", title: "title" },
        { id: 3, src: "/cassette.png", title: "title"}
      ],
      onDetailsClick: () => {}
    }
  ];

  return (
    <div className={styles.container}>
      {mockOrders.map(order => (
        <OrderCardListener
          key={order.orderId}
          orderId={order.orderId}
          orderNumber={order.orderNumber}
          itemsCount={order.itemsCount}
          totalPrice={order.totalPrice}
          previewItems={order.previewItems}
          onDetailsClick={order.onDetailsClick}
        />
      ))}
    </div>
  );
}
