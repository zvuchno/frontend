export type TNewUserRequest = {
  username: string,
  email: string,
  phone: string,
  password: string;
}

export type TNewArtistRequest =  TNewUserRequest & {
  name: string;
};
export type TNewListenerRequest = TNewUserRequest;

export type TNewUserResponse = {
  id: number,
  username: string,
  email: string,
  phone: string
}

export type TCurrentUserResponse = {
  id: number,
  username: string,
  email: string,
  phone: string,
  is_phone_verified: boolean,
  is_email_verified: boolean,
  is_listener: boolean,
  is_artist: boolean
}

export type TLoginData = {
  email: string,
  password: string
}

export type TAuthResponse = {
  access: string,
  refresh: string
}

export type TLogoutdata = {
  refresh: string
}

export type TFetchProps = {
  url: string, 
  fetchData: any,
  defaultMessage?: string
}

export type TVerifyEmailRequest = {
  uid: string;
  token: string;
}

export type TResetPasswordRequest = {
  email: string;
}

export type TResetPasswordVerifyRequest = {
  uid: string;
  token: string;
}

export type TResetPasswordConfirmRequest = {
  uid: string;
  token: string;
  new_password: string;
  retype_new_password: string;
}