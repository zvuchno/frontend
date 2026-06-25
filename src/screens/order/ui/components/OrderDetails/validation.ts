import { RegisterOptions, Validate } from "react-hook-form";
import { errorsMessages, fieldsConfig } from "./utils";
import { FieldValues, TOrderPersonalFormField } from "@/screens/order/model/types";

export const orderPersonalFormRules = (
  field: TOrderPersonalFormField,
): RegisterOptions<FieldValues> => {
  const config = fieldsConfig;
  const rules: any = {};

  if (field.required) {
    rules.required = errorsMessages.requiredMessage;
  }
  if (config[field.name].minLength) {
    rules.minLength = {
      value: config[field.name].minLength,
      message: errorsMessages.minLengthMessage + config[field.name].minLength,
    };
  }
  if (config[field.name].maxLength) {
    rules.maxLength = {
      value: config[field.name].maxLength,
      message: errorsMessages.maxLengthMessage + config[field.name].maxLength,
    };
  }
  if (config[field.name].pattern) {
    rules.pattern = {
      value: config[field.name].pattern,
      message: errorsMessages.patternMessage,
    };
  }
  if(config[field.name].validate) {
    rules.validate = {
      validate: config[field.name].validate
    }
  }

  return rules;
};


export const validatePhone: Validate<string | undefined, FieldValues> = (value) => {
  const number = value?.replace(/\D/g,'') || '';
  if (number?.length === 1) {
    return errorsMessages.requiredMessage
  };

  const isValid = /^79\d{9}$/.test(number);
  if (!isValid) {
    return errorsMessages.patternMessage;
  }
  return true;
}