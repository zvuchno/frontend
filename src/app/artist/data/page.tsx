import { type Metadata } from "next";

import { ArtistData } from "@/screens/artist/data";

import s from "./page.module.scss";

export const metadata: Metadata = {
  title: "Данные - Личный кабинет | ЗВУЧНО",
  openGraph: {
    title: "Данные - Личный кабинет | ЗВУЧНО",
  },
};

export default function ArtistDataPage() {
  return (
    <section className={s.page} aria-labelledby='artist-data-title'>
      <ArtistData />
    </section>
  );
}
