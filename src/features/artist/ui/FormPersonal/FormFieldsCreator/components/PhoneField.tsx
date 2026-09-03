import { type FieldError, type Noop, type RefCallBack } from "react-hook-form";
import { IMaskInput } from "react-imask";

import clsx from "clsx";

import styles from "../../artistFormPersonal.module.scss";
import { type TArtistFormPersonalField } from "../../utils/types";

export const PhoneField = ({
  field,
  fieldError,
  value,
  ref,
  onBlur,
  onChange,
}: {
  field: TArtistFormPersonalField;
  fieldError?: FieldError;
  value: string;
  ref: RefCallBack;
  onBlur: Noop;
  onChange: (tel: string) => void;
}) => (
  <IMaskInput
    mask='+{7}(000)000-00-00'
    lazy={false}
    placeholderChar='_'
    value={value}
    type='text'
    inputMode='tel'
    unmask={true}
    onAccept={(val) => onChange(val === "7" ? "" : val)}
    onBlur={onBlur}
    inputRef={ref}
    className={clsx(styles.input, styles.input_size_small, {
      [styles.error]: !!fieldError,
    })}
    style={{
      height: "40px",
      width: "100%",
      border: "1px solid var(--outline-color)",
      fontFamily: "var(--font-feature-mono)",
      paddingInline: "32px",
      fontSize: "16px",
      color: "var(--color-text-primary)",
    }}
    id={`${field.row}.${field.column}`}
    disabled={field.disabled}
    aria-disabled={field.disabled}
    required={field.required}
    aria-required={field.required}
  />
);
