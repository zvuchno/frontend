import { TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import MerchPageContent from "./merchPageContent/MerchPageContent";
import { TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";
import ReleasePageContent from "./releasePageContent/ReleasePageContent";
import ArtistPageContent from "./artistPageContent/ArtistPageContent";
import { TDetalArtist } from "@/widgets/ArtistDetailCard/model/ArtistDetailCard.types";
import s from "./DetailPage.module.scss";


export const DetailPage = ({
   card, 
   kind,
   selected
  }: { 
    card: TDetailMerch | TDetailRelease | TDetalArtist, 
    kind: 'merch' | 'release' | 'artists',
    selected: string | undefined
  }) => {

  const isMerch = kind === 'merch';
  const isRelease = kind === 'release';
  const isArtist = kind === 'artists';

  return (
    <div className={s.page}>
      {isMerch && <MerchPageContent merch={card as TDetailMerch}/>}
      {isRelease && <ReleasePageContent release={card as TDetailRelease} selected={selected} />}
      {isArtist && <ArtistPageContent artist={card as TDetalArtist}/>}
    </div>
  )
};