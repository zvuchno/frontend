import { type TDetalArtist } from "@/widgets/ArtistDetailCard";
import { type TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import { type TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";

import s from "./DetailPage.module.scss";
import ArtistPageContent from "./artistPageContent/ArtistPageContent";
import MerchPageContent from "./merchPageContent/MerchPageContent";
import ReleasePageContent from "./releasePageContent/ReleasePageContent";

export const DetailPage = ({
  card,
  kind,
  selected,
}: {
  card: TDetailMerch | TDetailRelease | TDetalArtist;
  kind: "merch" | "release" | "artists";
  selected: string | undefined;
}) => {
  const isMerch = kind === "merch";
  const isRelease = kind === "release";
  const isArtist = kind === "artists";

  return (
    <div className={s.page}>
      {isMerch && <MerchPageContent merch={card as TDetailMerch} />}
      {isRelease && <ReleasePageContent release={card as TDetailRelease} selected={selected} />}
      {isArtist && <ArtistPageContent artist={card as TDetalArtist} />}
    </div>
  );
};
