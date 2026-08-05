/*import type { FieldError, UseFormRegister } from "react-hook-form";

import clsx from "clsx";

import type {
  ArtistDataField as ArtistDataFieldConfig,
  ArtistDataFormValues,
} from "../../../../app/artist/data/artistDataForm.types";
import s from "./page.module.scss";

type ArtistDataFieldProps = {
  error?: FieldError;
  field: ArtistDataFieldConfig;
  isDisabled: boolean;
  register: UseFormRegister<ArtistDataFormValues>;
};

const getErrorMessage = (error?: FieldError) =>
  typeof error?.message === "string" ? error.message : null;

export function ArtistDataField({ error, field, isDisabled, register }: ArtistDataFieldProps) {
  const errorMessage = getErrorMessage(error);

  return (
    <label className={clsx(s.field, { [s.fieldWide]: field.wide })}>
      <span className={s.label}>{field.label}</span>
      <input
        className={clsx(s.input, {
          [s.inputInvalid]: Boolean(errorMessage),
        })}
        disabled={isDisabled}
        placeholder={field.placeholder}
        type='text'
        autoComplete={field.autoComplete}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? `${field.name}-error` : undefined}
        {...register(field.name, field.validation)}
      />
      {errorMessage ? (
        <span className={s.error} id={`${field.name}-error`}>
          {errorMessage}
        </span>
      ) : null}
    </label>
  );
}
*/