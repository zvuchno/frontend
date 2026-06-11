import { AccentContainer, Title } from "@/shared/ui";
import s from "./ArtistDetail.module.scss";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import clsx from "clsx";
import { ArtistDescription } from "@/widgets/ArtistDescription";

const ArtistDetail = () => {
  return (
    <AccentContainer className={s.containerWrapper}>
      <div className={s.container}>
        <CardArtist />
        <div className={s.info}>
          <div >
            <Title Tag="h2" className={clsx(s.text, s.info__title)}>fgdfghth</Title>
            <p className={clsx(s.text, s.info__subtitle)}>ghgfh</p>
          </div>
          <ArtistDescription variant="catalog" description="afkgalgrf;agr"/>
          <div className={s.info__contacts}>
            <div></div>
          </div>
        </div>
      </div>
    </AccentContainer>
  )
};

export default ArtistDetail;