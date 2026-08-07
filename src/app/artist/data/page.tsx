import { ArtistData } from "@/screens/artist/data";

import s from "./page.module.scss";

export default function ArtistDataPage() {
  return (
    <section className={s.page} aria-labelledby='artist-data-title'>
      <ArtistData />
    </section>
  );
}
