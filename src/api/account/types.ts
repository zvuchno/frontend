export type CurrentAccountResponse = {
  id: number;
  username: string;
  email: string;
  phone: string | null;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_listener: boolean;
  is_artist: boolean;
};

export type UpdateAccountPhonePayload = {
  phone?: string | null;
};

export type UpdateAccountPhoneResponse = {
  phone: string | null;
};

export type UpdateAccountPasswordPayload = {
  old_password: string;
  new_password: string;
  retype_new_password: string;
};

export type UpdateAccountPasswordResponse = void;

export type UpdateAccountUsernamePayload = {
  username?: string;
};

export type UpdateAccountUsernameResponse = {
  username: string;
};
