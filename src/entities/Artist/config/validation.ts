import { type FieldPath, type RegisterOptions } from "react-hook-form";

import { errorsMessages } from "@/shared/constants/formErrorMessages";

import {
  type TArtistSettingsFieldValues,
  type TArtistSettingsFormField,
} from "../model/artistSettings.types";
import { artistSettingsFieldsConfig } from "./config";

export const registerRules = (
  field: TArtistSettingsFormField<TArtistSettingsFieldValues>
): RegisterOptions<TArtistSettingsFieldValues, FieldPath<TArtistSettingsFieldValues>> => {
  const rules: RegisterOptions<
    TArtistSettingsFieldValues,
    FieldPath<TArtistSettingsFieldValues>
  > = {};
  const fieldConfig = artistSettingsFieldsConfig[field.name];

  if (!fieldConfig) return rules;
  if (field.required) {
    rules.required = errorsMessages.requiredMessage;

    if (fieldConfig.minLength) {
      rules.minLength = {
        value: fieldConfig.minLength,
        message: errorsMessages.minLengthMessage + fieldConfig.minLength,
      };
    }
    if (fieldConfig.maxLength) {
      rules.maxLength = {
        value: fieldConfig.maxLength,
        message: errorsMessages.maxLengthMessage + fieldConfig.maxLength,
      };
    }
    if (fieldConfig.pattern) {
      rules.pattern = {
        value: fieldConfig.pattern,
        message: errorsMessages.patternMessage,
      };
    }
    return rules;
  }

  return rules;
};
