import { type FieldPath, type RegisterOptions } from "react-hook-form";

import { type FieldValues, type TOrderPersonalFormField } from "@/screens/order/model/types";

import { errorsMessages } from "@/shared/constants/formErrorMessages";

import { fieldsConfig } from "./utils";

export const orderPersonalFormRules = (
  field: TOrderPersonalFormField
): RegisterOptions<FieldValues> => {
  const fieldConfig = fieldsConfig[field.name];
  const rules: RegisterOptions<FieldValues, FieldPath<FieldValues>> = {};

  if (!fieldConfig) return rules;

  if (field.required) {
    rules.required = errorsMessages.requiredMessage;
  }

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
  if (fieldConfig.validate) {
    rules.validate = {
      validate: fieldConfig.validate,
    };
  }

  return rules;
};
