import { type FieldError, type UseFormReturn } from "react-hook-form";

import { type TArtistLegalData } from "@/entities/Artist/store/types";

import { CustomInput } from "@/shared/ui";

import { issuerCodeFormatter } from "../../utils/issuerCodeFormatter";
import { type TArtistFormPersonalField } from "../../utils/types";
import { artistFormPersonalRules } from "../../utils/validation";

export const RegularField = ({
  field,
  fieldError,
  methods,
  className,
}: {
  field: TArtistFormPersonalField;
  fieldError: FieldError;
  className: string;
  methods: UseFormReturn<TArtistLegalData, undefined, TArtistLegalData>;
}) => {
  return (
    <CustomInput
      {...methods.register(field.name, artistFormPersonalRules(field) as TArtistFormPersonalField)}
      id={`${field.row}.${field.column}`}
      type={field.type}
      label={field.title}
      placeholder={field.placeholder}
      style={{
        height: "40px",
      }}
      error={!!fieldError}
      message={fieldError?.message}
      disabled={field.disabled}
      aria-disabled={field.disabled}
      required={field.required}
      aria-required={field.required}
      onChange={(e) => {
        void methods.register(field.name).onChange(e);
        issuerCodeFormatter(field, e);
      }}
      maxLength={field.maxLength}
      minLength={field.minLength}
      className={className}
    />
  );
};
