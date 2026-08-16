export type ListenerMe = {
  full_name: string;
};

export type UpdateListenerPayload = {
  full_name: string;
};

export type CurrentAccountResponse = {
  id: number;
  username: string;
  email: string;
  phone?: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_listener: boolean;
  is_artist: boolean;
  has_usable_password: boolean;
};

export type TListenerProfile = {
  listener: ListenerMe;
  account: CurrentAccountResponse;
};

export type UpdateAccountPhonePayload = {
  phone?: string | null;
};

export type UpdateAccountPhoneResponse = {
  phone?: string;
};

export type UpdateAccountPasswordPayload = {
  old_password: string;
  new_password: string;
  retype_new_password: string;
};

export type SetAccountPasswordPayload = {
  new_password: string;
  retype_new_password: string;
};

export type SetAccountPasswordResponse = void;

export type UpdateAccountPasswordResponse = void;

export type UpdateAccountUsernamePayload = {
  username?: string;
};

export type UpdateAccountUsernameResponse = {
  username: string;
};

// -------------------- //

export type ArtistApiDataItem = {
  id?: number;
  label: string;
  value: string;
};

export type CurrentArtistResponse = {
  id: number;
  profile_type: "artist" | "label";
  name: string;
  description: string | null;
  cover: string | null;
  city: string | null;
  //url: string | null;
  slug: string;
  contacts: ArtistApiDataItem[];
  socials: ArtistApiDataItem[];
};

export type UpdateCurrentArtistPayload = {
  name?: string;
  description?: string;
  city?: string;
  slug?: string;
  contacts?: ArtistApiDataItem[];
  socials?: ArtistApiDataItem[];
};

export type UpdateCurrentArtistResponse = {
  name: string;
  description: string | null;
  city: string | null;
  slug: string;
  contacts: ArtistApiDataItem[];
  socials: ArtistApiDataItem[];
};

export type UpdateCurrentArtistCoverPayload = {
  cover: File | Blob;
};

export type UpdateCurrentArtistCoverResponse = {
  cover: string | null;
};
