import { type Metadata } from "next";

import { OrdersPageClient } from "@/screens/fans";

export const metadata: Metadata = {
  title: "Заказы - Профиль | ЗВУЧНО",
  openGraph: {
    title: "Заказы - Профиль | ЗВУЧНО",
  },
};
export default function OrdersPage() {
  return <OrdersPageClient />;
}
