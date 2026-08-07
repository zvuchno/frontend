import { type Validate } from "react-hook-form";

import { type FieldValues } from "@/features/artist";

import { parseDateFromApi } from "./formatDate";

export const comparePassportDate: Validate<unknown, FieldValues> = (value, formValues) => {
  const birthDate = formValues?.identity_data?.birth_date;
  if (!birthDate || !value) return true;

  const isValid = parseDateFromApi(value as string) >= parseDateFromApi(birthDate);
  if (!isValid) {
    return "Дата выдачи паспорта не может быть раньше даты рождения";
  }
  return true;
};
