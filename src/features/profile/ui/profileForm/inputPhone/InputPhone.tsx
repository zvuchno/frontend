import { Controller, FieldError, get, useFormContext } from "react-hook-form";
import { FieldValues, TProfileFormField } from "../types";
import clsx from "clsx";
import { IMaskInput } from "react-imask";
import { registerRules } from "@/features/profile/utils/validation";
import styles from "./InputPhone.module.scss";

type TIputPhoneProps = {
  field: TProfileFormField;
  disabled: boolean;
  className?: string;
};

export const InputPhone = ({ field, disabled, className }: TIputPhoneProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const fieldError = get(errors, field.name) as FieldError;

  return (
    <Controller
      control={control}
      name={field.name}
      rules={registerRules(field)}
      render={({ field: { onChange, value, ref, onBlur } }) => (
        <div
          className={clsx(styles.field, { ["error"]: !!fieldError }, className)}
        >
          {field.title && (
            <div className={styles.labelContainer}>
              <label
                className={clsx(
                  styles.labelContainer__label,
                  styles.labelContainer__label_size_small,
                )}
                htmlFor={`${field.row}.${field.column}`}
              >
                {field.title}
              </label>
              {field.required && (
                <span className={styles.labelContainer__markRequired}>*</span>
              )}
            </div>
          )}
          <IMaskInput
            mask="+{7}(000)000-00-00"
            lazy={false}
            placeholderChar="_"
            value={value || ""}
            type="text"
            inputMode="tel"
            unmask={true}
            onAccept={(val) => onChange(val)}
            onBlur={onBlur}
            inputRef={ref}
            className={clsx("input input_size_small", {
              ["error"]: !!fieldError,
            })}
            style={{
              height: "40px",
              border: "1px solid currentColor",
              padding: "12px 32px",
              fontFamily: "var(--font-feature-mono)",
              fontSize: "16px"
            }}
            id={`${field.row}.${field.column}`}
            disabled={disabled}
            aria-disabled={disabled}
            required={field.required}
            aria-required={field.required}
          />
          {fieldError ? (
            <span className="message error">{fieldError.message}</span>
          ) : null}
        </div>
      )}
    />
  );
};
