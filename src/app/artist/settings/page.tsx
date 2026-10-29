import { type Metadata } from "next";

import { ArtistSettingsPage } from "@/screens/artist/settings";

export const metadata: Metadata = {
  title: "Доставка - Личный кабинет | ЗВУЧНО",
  openGraph: {
    title: "Доставка - Личный кабинет | ЗВУЧНО",
  },
};
export default function ArtistProfilePage() {
  return <ArtistSettingsPage />;
}
