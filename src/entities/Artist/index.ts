export { CardArtist } from "./ui/CardArtist/CardArtist";
export { ShowcaseCard } from "./ui/ShowcaseCard/ShowcaseCard";
export type {
  TShowcaseAlbum,
  TShowcaseMerch,
  TShowcasePromocode,
  StockFilter,
  TShowcaseItem,
  PromoTypeFilter,
} from "./model/types";
export {
  getShowcaseAlbumsList,
  getShowcaseMerchList,
  getShowcasePromocodes,
} from "./api/showcaseApi";

export {
  useAlbumsInfiniteQuery,
  useMerchInfiniteQuery,
  usePromocodesInfiniteQuery,
  useToggleAlbumVisibility,
  useToggPromocodeVisibility,
  useToggleMerchVisibility,
  useDeleteAlbum,
  useDeleteMerch,
  useDeletePromocode,
} from "./model/useShowcase";

export { useGetArtistLegalData } from "./model/useGetArtistLegalData";
