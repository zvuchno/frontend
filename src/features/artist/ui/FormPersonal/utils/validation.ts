import { type FieldPath, type RegisterOptions, type Validate } from "react-hook-form";

import { errorsMessages } from "@/shared/constants/formErrorMessages";

import { fieldsConfig } from "../config/fields-config";
import type { FieldValues, TArtistFormPersonalField } from "./types";

export const artistFormPersonalRules = <TFieldValues extends FieldValues>(
  field: TArtistFormPersonalField
): RegisterOptions<TFieldValues, FieldPath<TFieldValues>> => {
  const config = fieldsConfig;
  const rules: RegisterOptions<TFieldValues, FieldPath<TFieldValues>> = {};

  rules.required = errorsMessages.requiredMessage;

  const fieldConfig = config[field.name];

  if (!fieldConfig) return {};

  if ("minLength" in fieldConfig && fieldConfig.minLength) {
    rules.minLength = {
      value: fieldConfig.minLength,
      message: errorsMessages.minLengthMessage + fieldConfig.minLength,
    };
  }
  if ("maxLength" in fieldConfig && fieldConfig.maxLength) {
    rules.maxLength = {
      value: fieldConfig.maxLength,
      message: errorsMessages.maxLengthMessage + fieldConfig.maxLength,
    };
  }
  if ("pattern" in fieldConfig && fieldConfig.pattern) {
    rules.pattern = {
      value: fieldConfig.pattern,
      message: errorsMessages.patternMessage,
    };
  }
  if ("validate" in fieldConfig && fieldConfig.validate) {
    rules.validate = fieldConfig.validate as
      | Validate<unknown, FieldValues>
      | Record<string, Validate<unknown, FieldValues>>;
  }

  return rules;
};
