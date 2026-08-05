export { CardArtist } from "./ui/CardArtist/CardArtist";
export { ShowcaseCard } from "./ui/ShowcaseCard/ShowcaseCard";
export type {
  TShowcaseAlbum,
  TShowcaseMerch,
  TShowcasePromocode,
  StockFilter,
  TShowcaseItem,
  PromoTypeFilter,
  TDeleteImageRequest,
  TShowcaseAlbumDetail,
  TShowcaseMerchDetail,
  TUpdateAlbumPayload,
  TUpdateMerchPayload,
  TAddImagePayload,
  TAddImageResponse,
  TCreateAlbumRequest,
  TCreateMerchRequest,
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
  useUpdateAlbum,
  useUpdateMerch,
  useUpdatePromocode,
  useDeleteAlbum,
  useDeleteMerch,
  useDeletePromocode,
  useDetailInfo,
  useCreateAlbum,
  useCreateMerch,
  useGenresList,
  useMerchKindsList,
  useAddImage,
  useUpdateImage,
  useDeleteImage,
} from "./model/useShowcase";

export { useGetArtistLegalData } from "./model/useGetArtistLegalData";
