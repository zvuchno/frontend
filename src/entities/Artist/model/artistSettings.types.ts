import { type HTMLInputTypeAttribute } from "react";

export type TArtistSettingsFieldValues = {
  pvz_code?: string;
  pvz_city_code?: string;
  pvz_city?: string;
  pvz_address?: string;
  pickupPoints?: TPickupPointForm[];
  support_email?: string;
  returns_email?: string;
  shipping_enabled?: boolean;
  pickup_enabled?: boolean;
};

//export type pickupPointsFields = `pickupPoints.${keyof TPickupPointMe}`;

export type TTelegramBotConnectResponse = {
  url: string;
  connected: boolean;
};

export type TPickupPointMe = {
  id?: number;
  address?: string;
  pickup_date?: string | null;
  is_active?: boolean;
};

export type TPVZOfficeMe = {
  pvz_code?: string;
  city_code?: string;
  city?: string;
  address?: string;
} | null;

export type TStoreSettings = {
  support_email?: string;
  returns_email?: string;
  shipping_enabled?: boolean;
  pickup_enabled?: boolean;
} | null;

export type TArtistSettingsFormField<
  T extends TArtistSettingsFieldValues = TArtistSettingsFieldValues,
> = {
  title?: string;
  name: keyof T;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
};

export type TPickupPointForm = Omit<TPickupPointMe, "id"> & {
  server_id?: number;
};
