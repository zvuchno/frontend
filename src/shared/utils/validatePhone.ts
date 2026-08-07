import type { FieldValues, Validate } from "react-hook-form";

import { errorsMessages } from "../constants/formErrorMessages";

export const validatePhone: Validate<unknown, FieldValues> = (value) => {
  const number = typeof value === "string" ? value?.replace(/\D/g, "") || "" : "";
  if (number?.length === 1) {
    return errorsMessages.requiredMessage;
  }

  const isValid = /^79\d{9}$/.test(number);
  if (!isValid) {
    return errorsMessages.patternMessage;
  }
  return true;
};
