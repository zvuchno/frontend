import { type SetStateAction } from "react";
import { type FieldPath, type FieldValues, type UseFormSetError } from "react-hook-form";



import { ApiError } from "@/api/errors/apiError";










type NamedField<TFormValues extends FieldValues> = {
  name: FieldPath<TFormValues>;
};

export const setServerErrors = <TFormValues extends FieldValues>(
  fields: readonly NamedField<TFormValues>[],
  error: Error,
  setError: UseFormSetError<TFormValues>,
  setServerErrorMessage?: (value: SetStateAction<string>) => void
): void => {
  console.error("[setServerErrors] Ошибка сервера:", error);

  setServerErrorMessage?.(error.message || "Произошла ошибка");

  if (!(error instanceof ApiError)) return;

  console.error("[setServerErrors] Ошибки полей:", error.details);

  const fieldNames = new Set<string>(fields.map(({ name }) => name));
  const isFormField = (key: string): key is FieldPath<TFormValues> => fieldNames.has(key);

  for (const [key, message] of Object.entries(error.details)) {
    if (isFormField(key)) {
      setError(key, { type: "server", message });
      console.error(`[setServerErrors] Ошибка для поля "${key}":`, message);
    } else {
      console.warn(`[setServerErrors] Поле "${key}" не найдено в конфигурации формы`);
    }
  }
};
