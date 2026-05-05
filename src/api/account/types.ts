export type UpdateAccountPhonePayload = {
  phone?: string | null;
};

export type UpdateAccountPhoneResponse = {
  phone: string | null;
};

export type UpdateAccountPasswordPayload = {
  password: string;
};

export type UpdateAccountPasswordResponse = void;
