import { type FieldPath, type RegisterOptions, type Validate } from "react-hook-form";

import { errorsMessages } from "@/shared/constants/formErrorMessages";
import { getRuleValue } from "@/shared/utils/getRuleValue";

import type { FieldValues, TProfileFormField } from "../ui/profileForm/types";
import { fieldsConfig } from "./constants";

type TOptionalValidators = Record<string, Validate<unknown, FieldValues>>;

// Вспомогательная функция для валидации объекта с несколькими правилами
const executeGroupValidators = (
  validators: Record<string, Validate<unknown, FieldValues>>,
  value: unknown,
  formValues: FieldValues
) => {
  for (const key in validators) {
    if (!Object.prototype.hasOwnProperty.call(validators, key)) continue;

    const result = validators[key](value, formValues);
    if (result !== true) return result; // Возвращаем первую же ошибку
  }
  return true;
};

const createOptionalValidators = (fieldConfig: RegisterOptions): TOptionalValidators => {
  const validators: TOptionalValidators = {};

  const minLengthVal = getRuleValue(fieldConfig.minLength);
  if (minLengthVal !== undefined) {
    validators.minLength = (value) => {
      const stringValue = typeof value === "string" ? value : "";
      return !stringValue || stringValue.length >= minLengthVal
        ? true
        : errorsMessages.minLengthMessage + minLengthVal;
    };
  }

  const maxLengthVal = getRuleValue(fieldConfig.maxLength);
  if (maxLengthVal !== undefined) {
    validators.maxLength = (value) => {
      const stringValue = typeof value === "string" ? value : "";
      return !stringValue || stringValue.length <= maxLengthVal
        ? true
        : errorsMessages.maxLengthMessage + maxLengthVal;
    };
  }

  if (fieldConfig.pattern) {
    const patternRegex =
      fieldConfig.pattern instanceof RegExp
        ? fieldConfig.pattern
        : fieldConfig.pattern &&
            typeof fieldConfig.pattern === "object" &&
            "value" in fieldConfig.pattern
          ? fieldConfig.pattern.value
          : undefined;

    if (patternRegex instanceof RegExp) {
      validators.pattern = (value) => {
        const stringValue = typeof value === "string" ? value : "";
        return !stringValue || patternRegex.test(stringValue)
          ? true
          : errorsMessages.patternMessage;
      };
    }
  }

  if (fieldConfig.validate) {
    validators.validate = (value, formValues) => {
      if (!value) return true;

      const { validate } = fieldConfig;

      if (typeof validate === "function") {
        return (validate as Validate<unknown, FieldValues>)(value, formValues);
      }

      if (typeof validate === "object" && validate !== null) {
        const group = validate as Record<string, Validate<unknown, FieldValues>>;
        return executeGroupValidators(group, value, formValues);
      }

      return true;
    };
  }
  return validators;
};

export const registerRules = (
  field: TProfileFormField
): RegisterOptions<FieldValues, FieldPath<FieldValues>> => {
  const rules: RegisterOptions<FieldValues, FieldPath<FieldValues>> = {};
  const fieldConfig = fieldsConfig[field.name];

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
    if (fieldConfig.validate) {
      rules.validate = {
        validate: fieldConfig.validate,
      };
    }
    return rules;
  }

  const optionalRules = createOptionalValidators(fieldConfig);
  if (Object.keys(optionalRules).length > 0) {
    rules.validate = optionalRules;
  }

  return rules;
};
