import { ArtistDataForm } from "./ArtistDataForm";
import s from "./page.module.scss";

export default function ArtistDataPage() {
  return (
    <section className={s.page} aria-labelledby="artist-data-title">
      <h3 className={s.title} id="artist-data-title">
        Личные данные
      </h3>
      <ArtistDataForm />
    </section>
  );
}
