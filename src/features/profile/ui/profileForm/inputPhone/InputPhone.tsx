import { Controller, type FieldError, get, useFormContext } from "react-hook-form";
import { IMaskInput } from "react-imask";
<<<<<<< Updated upstream

import clsx from "clsx";

import { registerRules } from "../../../utils/validation";
import { type FieldValues, type TProfileFormField } from "../types";
import styles from "./InputPhone.module.scss";
=======
import { registerRules } from "@/features/profile/utils/validation";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
export const InputPhone = ({
  field,
  disabled,
}: TIputPhoneProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const fieldError = get(errors, field.name) as FieldError;

>>>>>>> Stashed changes
  return (
    <Controller
      control={control}
      name={field.name}
      rules={registerRules(field)}
      render={({ field: { onChange, value, ref, onBlur } }) => (
<<<<<<< Updated upstream
        <div className={clsx(styles.field, { ["error"]: !!fieldError }, className)}>
          {field.title && (
            <div className={styles.labelContainer}>
              <label
                className={clsx(
                  styles.labelContainer__label,
                  styles.labelContainer__label_size_small
                )}
=======
        <div className={clsx("field", { ["error"]: !!fieldError })}>
          {field.title && (
            <div className="labelContainer">
              <label
                className="labelContainer__label labelContainer__label_size_small"
>>>>>>> Stashed changes
                htmlFor={`${field.row}.${field.column}`}
              >
                {field.title}
              </label>
<<<<<<< Updated upstream
              {field.required && <span className={styles.labelContainer__markRequired}>*</span>}
=======
              {field.required && (
                <span className="labelContainer__markRequired">*</span>
              )}
>>>>>>> Stashed changes
            </div>
          )}
          <IMaskInput
            mask='+{7}(000)000-00-00'
            lazy={false}
<<<<<<< Updated upstream
            placeholderChar='_'
            value={value || ""}
            type='text'
            inputMode='tel'
=======
            placeholderChar="_"
            value={value || ""}
            type="text"
            inputMode="tel"
>>>>>>> Stashed changes
            unmask={true}
            onAccept={(val) => onChange(val)}
            onBlur={onBlur}
            inputRef={ref}
            className={clsx("input input_size_small", {
              ["error"]: !!fieldError,
            })}
<<<<<<< Updated upstream
            style={{
              height: "40px",
              border: "1px solid currentColor",
              padding: "12px 32px",
              fontFamily: "var(--font-feature-mono)",
              fontSize: "16px",
            }}
=======
            style={{ height: "40px" }}
>>>>>>> Stashed changes
            id={`${field.row}.${field.column}`}
            disabled={disabled}
            aria-disabled={disabled}
            required={field.required}
            aria-required={field.required}
          />
<<<<<<< Updated upstream
          {fieldError ? <span className='message error'>{fieldError.message}</span> : null}
=======
          {fieldError ? (
            <span className="message error">{fieldError.message}</span>
          ) : null}
>>>>>>> Stashed changes
        </div>
      )}
    />
  );
<<<<<<< Updated upstream
};
=======
};
>>>>>>> Stashed changes
