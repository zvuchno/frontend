import { type FieldValues, type Validate } from "react-hook-form";

import { parseDateFromApi } from "./formatDate";

export const validateDateInPast: Validate<unknown, FieldValues> = (value) => {
  const parsedDate = parseDateFromApi(value as string);

  if (!parsedDate || isNaN(parsedDate.getTime())) {
    return true;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate > today) return "Дата не может быть в будущем";

  return true;
};
