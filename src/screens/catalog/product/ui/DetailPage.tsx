// при клике на карточку передватать помимо id еще тип карточки (артист / релиз / мерч)
// на этой странице получать детальный продукт
// рендерить контент страницы в зависимости от типа, передавая в него данные, полученные о продукте:
// ArtistPageContent.tsx (принимает: id, product)
// ReleasePageContent.tsx (принимает: id, product)
// MerchPageContent.tsx (принимает: id, product)

import { TDetailMerch } from "@/widgets/ProductDetailCard/MerchDescription";
import MerchPageContent from "./merchPageContent/MerchPageContent";
import { TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";
import ReleasePageContent from "./releasePageContent/ReleasePageContent";
import ArtistPageContent from "./artistPageContent/ArtistPageContent";

type TContact = {
  id: number;
  label: string;
  value: string;
}

type TArtist = {
  contacts: TContact[];
  socials: TContact[];
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  slug: string;
}


export const DetailPage = ({ card, kind }: { card: TDetailMerch | TDetailRelease | TArtist, kind: 'merch' | 'release' | 'artists' }) => {

  const isMerch = kind === 'merch';
  const isRelease = kind === 'release';
  const isArtist = kind === 'artists';

  return (
    <>
      {isMerch && <MerchPageContent merch={card as TDetailMerch}/>}
      {isRelease && <ReleasePageContent release={card as TDetailRelease} />}
      {isArtist && <ArtistPageContent />}
    </>
  )
};