import {
  useSetAccountPassword,
  useUpdateAccountPassword,
  useUpdateAccountUsername,
} from "@/entities/profile/model/useListenerProfile";

export {
  useListenerProfile,
  useUpdateListenerName,
  useUpdateAccountPhone,
} from "./model/useListenerProfile";

export { useCurrentArtist, useUpdateArtist, useUpdateArtistCover } from "./model/useArtistProfile";

export type {
  ListenerMe,
  UpdateListenerPayload,
  CurrentAccountResponse,
  TListenerProfile,
  SetAccountPasswordPayload,
  SetAccountPasswordResponse,
  UpdateAccountPhonePayload,
  UpdateAccountPhoneResponse,
  UpdateAccountPasswordPayload,
  UpdateAccountPasswordResponse,
  UpdateAccountUsernamePayload,
  UpdateAccountUsernameResponse,
  ArtistApiDataItem,
  CurrentArtistResponse,
  UpdateCurrentArtistPayload,
  UpdateCurrentArtistResponse,
  UpdateCurrentArtistCoverPayload,
  UpdateCurrentArtistCoverResponse,
} from "./model/types";

export {
  useSetAccountPassword,
  useUpdateAccountPassword,
  useUpdateAccountUsername,
} from "./model/useListenerProfile";
