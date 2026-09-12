import { type HTMLInputTypeAttribute } from "react";
import { type FieldPath } from "react-hook-form";

export type TArtistSettingsFieldValues = {
  shippingPoint?: TPVZOfficeMe;
  pickupPoints?: TPickupPointForm[];
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

export type TPickupSettings = {
  enabled?: boolean;
  points?: TPickupPointMe[];
};

export type TPVZOfficeMe = {
  pvz_code?: string;
  city_code?: string;
  city?: string;
  address?: string;
} | null;

export type TShippingSettings = {
  enabled?: boolean;
  point?: TPVZOfficeMe;
};


export type TArtistSettingsFormField<
  T extends TArtistSettingsFieldValues = TArtistSettingsFieldValues,
> = {
  title?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
};

export type TPickupPointForm = Omit<TPickupPointMe, "id"> & {
  server_id?: number;
};
