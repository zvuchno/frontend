import { type Metadata } from "next";

import { FavoritesPageClient } from "@/screens/fans";

export const metadata: Metadata = {
  title: "Избранное - Профиль | ЗВУЧНО",
  openGraph: {
    title: "Избранное - Профиль | ЗВУЧНО",
  },
};

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
