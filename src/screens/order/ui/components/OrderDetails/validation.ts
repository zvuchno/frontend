import { type RegisterOptions, type ValidationRule } from "react-hook-form";

import { type FieldValues, type TOrderPersonalFormField } from "@/screens/order/model/types";

import { errorsMessages } from "@/shared/constants/formErrorMessages";

import { fieldsConfig } from "./utils";

export const orderPersonalFormRules = (
  field: TOrderPersonalFormField
): RegisterOptions<FieldValues> => {
  const fieldConfig = fieldsConfig[field.name];
  const rules: RegisterOptions<FieldValues> = {};

  if (!fieldConfig) return rules;

  if (field.required) {
    rules.required = errorsMessages.requiredMessage;
  }

  if (fieldConfig.minLength) {
    const lengthVal =
      typeof fieldConfig.minLength === "object"
        ? fieldConfig.minLength.value
        : fieldConfig.minLength;

    rules.minLength = {
      value: fieldConfig.minLength,
      message: errorsMessages.minLengthMessage + String(lengthVal),
    } as ValidationRule<number>;
  }
  if (fieldConfig.maxLength) {
    const lengthVal =
      typeof fieldConfig.maxLength === "object"
        ? fieldConfig.maxLength.value
        : fieldConfig.maxLength;
    rules.maxLength = {
      value: fieldConfig.maxLength,
      message: errorsMessages.maxLengthMessage + String(lengthVal),
    } as ValidationRule<number>;
  }
  if (fieldConfig.pattern) {
    rules.pattern = {
      value: fieldConfig.pattern,
      message: errorsMessages.patternMessage,
    } as ValidationRule<RegExp>;
  }
  if (fieldConfig.validate) {
    rules.validate = fieldConfig.validate as unknown as RegisterOptions<FieldValues>["validate"];
  }

  return rules;
};
