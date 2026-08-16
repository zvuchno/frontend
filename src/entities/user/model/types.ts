export type TNewUserRequest = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type TNewArtistRequest = TNewUserRequest & {
  name: string;
};
export type TNewListenerRequest = TNewUserRequest;

export type TNewUserResponse = {
  id: number;
  username: string;
  email: string;
  phone: string;
};

export type TCurrentUserResponse = {
  id: number;
  username: string;
  email: string;
  phone: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_listener: boolean;
  is_artist: boolean;
  profile_type?: "artist" | "label";
  artist_name?: string
};

export type TLoginData = {
  email: string;
  password: string;
  rememberme: boolean;
};

export type TAuthResponse = {
  access: string;
  refresh: string;
};

export type TLogoutdata = {
  refresh: string;
};

export type TFetchProps = {
  url: string;
  fetchData: any;
  defaultMessage?: string;
};

export type TVerifyEmailRequest = {
  uid: string;
  token: string;
};

export type TResetPasswordRequest = {
  email: string;
};

export type TResetPasswordVerifyRequest = {
  uid: string;
  token: string;
};

export type TResetPasswordConfirmRequest = {
  uid: string;
  token: string;
  new_password: string;
  retype_new_password: string;
};

export interface UserDataProps {
  id?: number;
  userName?: string;
  email?: string;
  phone?: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  isListener?: boolean;
  isArtist?: boolean;
  artistName?: string;
  accessToken?: string;
}

export interface UserStoreProps {
  user?: UserDataProps;
  isUserAuthorized?: boolean;
  isLoading: boolean;
  error: string | null;
  // email на этапе регистрации для модального окна о письме подтверждения
  tempEmail: string | null;

  setUser: (user: UserDataProps) => void;
  setIsUserAuthorized: (auth: boolean) => void;
  setIsLoading: (load: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
  setTempEmail: (email: string) => void;
}

export type TSocialAuthRequest = {
  provider: string; // "vk" | "yandex";
  access_token: string;
  code?: string;
};

export type TSocialAuthResponse = {
  access: string;
  refresh: string;
};
