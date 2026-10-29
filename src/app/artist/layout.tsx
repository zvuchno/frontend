import type { Metadata } from "next";

import ArtistLayoutClient from "./ArtistLayoutClient";

export const metadata: Metadata = {
  title: "Личный кабинет | ЗВУЧНО",
  openGraph: {
    title: "Личный кабинет | ЗВУЧНО",
  },
};

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return <ArtistLayoutClient>{children}</ArtistLayoutClient>;
}
