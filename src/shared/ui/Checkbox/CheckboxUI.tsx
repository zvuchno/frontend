"use client";

import { type ChangeEvent, forwardRef } from "react";

import clsx from "clsx";

import { CheckBoxIcon } from "../Icons/checkBoxIcon";
import { RadioButtonIcon } from "../Icons/radioButtonIcon";
import styles from "./checkbox.module.scss";
import { type TCheckboxUIProps } from "./types";

export const CheckboxUI = forwardRef<HTMLInputElement, TCheckboxUIProps>(
  (
    {
      type = "checkbox",
      children,
      isChecked = false,
      checked,
      disabled = false,
      onChange,
      name,
      value,
      className,
    },
    ref
  ) => {
    const isInputChecked = checked !== undefined ? checked : isChecked;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
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
          checked={isInputChecked}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          value={value}
          ref={ref}
          //aria-hidden='true'
        />
        <span className={styles.checkboxWrapper} aria-hidden='true'>
          <span
            className={styles.checkboxArea}
            //role={type === "checkbox" ? "checkbox" : "radio"}
            //aria-checked={isChecked}
            aria-disabled={disabled}
            //aria-label={type}
          >
            {type === "checkbox" && <CheckBoxIcon isChecked={!!isInputChecked} />}
            {type === "radio" && <RadioButtonIcon isSelected={!!isInputChecked} />}
          </span>
        </span>
        <span className={styles.checkboxLabel}>
          <p className={styles.checkboxText}>{children}</p>
        </span>
      </label>
    );
  }
);

CheckboxUI.displayName = "CheckboxUI";
