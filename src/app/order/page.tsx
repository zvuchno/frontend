import { type Metadata } from "next";

import { OrderPage } from "@/screens/order";

export const metadata: Metadata = {
  title: "Оформить заказ | ЗВУЧНО",
  openGraph: {
    title: "Оформить заказ | ЗВУЧНО",
  },
};

function Order() {
  return <OrderPage />;
}

export default Order;
