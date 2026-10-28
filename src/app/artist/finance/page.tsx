import { type Metadata } from "next";

import { ArtistFinance } from "@/screens/artist/finance/ui/ArtistFinance";

export const metadata: Metadata = {
  title: "Финансы - Личный кабинет | ЗВУЧНО",
  openGraph: {
    title: "Финансы - Личный кабинет | ЗВУЧНО",
  },
};

export default function ArtistFinancePage() {
  return <ArtistFinance />;
}
