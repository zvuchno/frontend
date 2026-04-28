import { RegisterOptions } from "react-hook-form";
import { FieldValues, TArtistFormPersonalField } from "../types";
import { errorsMessages, fieldsConfig } from "./constants";

export const artistFormPersonalRules = (field: TArtistFormPersonalField): RegisterOptions<FieldValues> => {
  const config = fieldsConfig;
  const rules: any = {}

  if(field.required) {
    rules.required = errorsMessages.requiredMessage
  }
  if(config[field.name].minLength) {
    rules.minLength = {
      value: config[field.name].minLength,
      message: errorsMessages.minLengthMessage + config[field.name].minLength
    };
  }
  if(config[field.name].maxLength) {
    rules.maxLength = {
      value: config[field.name].maxLength,
      message: errorsMessages.maxLengthMessage + config[field.name].maxLength
    }
  }
  if(config[field.name].pattern) {
    rules.pattern = {
      value: config[field.name].pattern,
      message: errorsMessages.patternMessage
    }
  }

  return rules;
}