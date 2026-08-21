import { type Validate } from "react-hook-form";

import { type TArtistSettingsFieldValues } from "../model/artistSettings.types";

export const artistSettingsFieldsConfig: Record<
  keyof TArtistSettingsFieldValues,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: Validate<string | undefined, TArtistSettingsFieldValues>;
  }
> = {
  pvz_address: {
    required: false,
  },
  pvz_city: {
    required: false,
  },
  pvz_city_code: {
    required: false,
  },
  pvz_code: {
    required: false,
  },
  support_email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  returns_email: {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  pickupPoints: {
    required: false,
  },
};
