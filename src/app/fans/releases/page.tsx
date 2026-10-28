import { type Metadata } from "next";

import { ReleasesPageClient } from "@/screens/fans";

export const metadata: Metadata = {
  title: "Библиотека - Профиль | ЗВУЧНО",
  openGraph: {
    title: "Библиотека - Стать артистом - Профиль | ЗВУЧНО",
  },
};

export default function ReleasesPage() {
  return <ReleasesPageClient />;
}
