import { type FieldPath, type Validate } from "react-hook-form";

import { type TArtistSettingsFieldValues } from "../model/artistSettings.types";

export const artistSettingsFieldsConfig: Partial<Record<
  FieldPath<TArtistSettingsFieldValues>,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: Validate<string | undefined, TArtistSettingsFieldValues>;
  }
>> = {
  shippingPoint: {
    required: false,
  },
  pickupPoints: {
    required: false,
  },
  pickup_enabled: {
    required: false,
  },
  shipping_enabled: {
    required: false,
  },
};
