import { RegisterOptions, Validate } from "react-hook-form";
import { FieldValues, TProfileFormField } from "../ui/profileForm/types";
import { errorsMessages, fieldsConfig } from "./constants";

export const validatePhone: Validate<string | undefined, FieldValues> = (
  value,
) => {
  const number = value?.replace(/\D/g, "") || "";
  if (number?.length === 1) {
    return errorsMessages.requiredMessage;
  }
  if (number?.length !== 11) {
    return errorsMessages.patternMessage;
  }
  return true;
};

export const registerRules = (
  field: TProfileFormField,
): RegisterOptions<FieldValues> => {
  const config = fieldsConfig;
  const rules: RegisterOptions<FieldValues> = {};
  const fieldConfig = config[field.name];
  const isOptionalField = !field.required;

  if (field.required) {
    rules.required = errorsMessages.requiredMessage;
  }
  if (fieldConfig.minLength && !isOptionalField) {
    rules.minLength = {
      value: fieldConfig.minLength,
      message: errorsMessages.minLengthMessage + fieldConfig.minLength,
    };
  }
  if (fieldConfig.maxLength && !isOptionalField) {
    rules.maxLength = {
      value: fieldConfig.maxLength,
      message: errorsMessages.maxLengthMessage + fieldConfig.maxLength,
    };
  }
  if (fieldConfig.pattern && !isOptionalField) {
    rules.pattern = {
      value: fieldConfig.pattern,
      message: errorsMessages.patternMessage,
    };
  }
  if (fieldConfig.validate && !isOptionalField) {
    rules.validate = {
      validate: fieldConfig.validate,
    };
  }

  if (isOptionalField) {
    const optionalRules: Record<
      string,
      Validate<string | undefined, FieldValues>
    > = {};

    if (fieldConfig.minLength) {
      optionalRules.minLength = (value) =>
        !value || value.length >= fieldConfig.minLength!
          ? true
          : errorsMessages.minLengthMessage + fieldConfig.minLength;
    }

    if (fieldConfig.maxLength) {
      optionalRules.maxLength = (value) =>
        !value || value.length <= fieldConfig.maxLength!
          ? true
          : errorsMessages.maxLengthMessage + fieldConfig.maxLength;
    }

    if (fieldConfig.pattern) {
      optionalRules.pattern = (value) =>
        !value || fieldConfig.pattern!.test(value)
          ? true
          : errorsMessages.patternMessage;
    }

    if (fieldConfig.validate) {
      optionalRules.validate = (value, formValues) =>
        !value ? true : fieldConfig.validate!(value, formValues);
    }

    if (Object.keys(optionalRules).length > 0) {
      rules.validate = optionalRules;
    }
  }

  return rules;
};
