import { type Metadata } from "next";

import { OrdersPageArtist } from "@/screens/artist";

export const metadata: Metadata = {
  title: "Продажи - Личный кабинет | ЗВУЧНО",
  openGraph: {
    title: "Продажи - Личный кабинет | ЗВУЧНО",
  },
};

export default function ArtistOrdersPage() {
  return <OrdersPageArtist />;
}
