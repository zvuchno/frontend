import { ArtistData } from "@/screens/artist/data";

//import { ArtistDataForm } from "../../../screens/artist/data/components/ArtistDataForm";
import s from "./page.module.scss";

export default function ArtistDataPage() {
  return (
    <section className={s.page} aria-labelledby='artist-data-title'>
      <ArtistData />
    </section>
  );
}
