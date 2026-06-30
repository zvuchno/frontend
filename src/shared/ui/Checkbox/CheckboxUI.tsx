import { type ChangeEvent } from "react";

import clsx from "clsx";

import { CheckBoxIcon } from "../Icons/checkBoxIcon";
import { RadioButtonIcon } from "../Icons/radioButtonIcon";
import styles from "./checkbox.module.scss";
import { type TCheckboxUIProps } from "./types";

export const CheckboxUI = ({
  type = "checkbox",
  children,
  isChecked = false,
  disabled = false,
  onChange,
  name,
  value,
  className,
}: TCheckboxUIProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };
  return (
    <label
      className={clsx(
        styles.checkbox,
        { [styles.radioButton]: type === "radio" },
        { [styles.noChecked]: type === "radio" && !isChecked },
        { [styles.disabled]: disabled },
        className
      )}
    >
      <input
        type={type}
        className={styles.hiddenInput}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        value={value}
        aria-hidden='true'
      />
      <span className={styles.checkboxWrapper} aria-hidden='true'>
        <span
          className={styles.checkboxArea}
          role={type === "checkbox" ? "checkbox" : "radio"}
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-label={type}
        >
          {type === "checkbox" && <CheckBoxIcon isChecked={isChecked} />}
          {type === "radio" && <RadioButtonIcon isSelected={isChecked} />}
        </span>
      </span>
      <span className={styles.checkboxLabel}>
        <p className={styles.checkboxText}>{children}</p>
      </span>
    </label>
  );
};
