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
  TCreatePromocodeRequest,
  TUploadTrackPayload,
  TShowcaseUpdateTrackInfoPayload,
  TUpdateTrackPayload,
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
  useDetailPromocode,
  useCreatePromocode,
  useTracksInfiniteQuery,
  useDetailTrack,
  useDeleteTrack,
  useUpdateTrackInfo,
  useUploadTrack,
  useUpdateTrack,
} from "./model/useShowcase";

export { useGetArtistLegalData } from "./model/useGetArtistLegalData";
export { useGetRecipientTypes } from "./model/useGetRecipientTypes";
export { useUpdateArtistLegalData } from "./model/useUpdateArtistLegalData";
export { artistSettingsFieldsConfig } from "./config/config";
export { registerRules } from "./config/validation";
export type {
  TArtistSettingsFieldValues,
  TPVZOfficeMe,
  TPickupPointMe,
  TTelegramBotConnectResponse,
  TSupportSettings,
  TPickupPointForm,
} from "./model/artistSettings.types";
export { connectTelegramBot } from "./api/artistSettings.api";
export { useConnetcTelegramBot } from "./model/useConnetcTelegramBot";
export {
  useAddArtistPickupPoint,
  useChangeArtistPickupPoint,
  useDeleteArtistPickupPoint,
  useGetArtistPickupPoints,
} from "./model/useArtistPickupPoints";
export {
  useCreateArtistPvzOffice,
  useDeleteArtistPvzOffice,
  useGetArtistPvzOffice,
} from "./model/useArtistPvzOffice";

export {
  useGetArtistSupportContacts,
  useManageArtistSupportContacts,
} from "./model/useArtistSupportContacts";
