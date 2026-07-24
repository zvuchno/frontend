"use client";

import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

import clsx from "clsx";

import { FieldErrorMessage } from "../FieldErrorMessage/FieldErrorMessage";
import s from "./PhoneInput.module.scss";

interface PhoneInputProps {
  id: string;
  value: string;
  label: string;
  inputSize?: "small" | "large";
  hasError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      id,
      label,
      hasError = false,
      errorMessage,
      inputSize = "small",
      className,
      autoFocus,
      required,
      disabled,
      onChange,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const inputClassName = clsx(
      s.input,
      { [s.error]: hasError },
      inputSize === "small" ? s.input_size_small : s.input_size_large,
      className
    );

    const labelClassName = clsx(
      s.labelContainer__label,
      inputSize === "small"
        ? s.labelContainer__label_size_small
        : s.labelContainer__label_size_large
    );

    return (
      <div className={s.field}>
        {label && (
          <div className={s.labelContainer}>
            <label className={labelClassName} htmlFor={id}>
              {label}
            </label>
            {required && <span className={s.labelContainer__markRequired}>*</span>}
          </div>
        )}

        <IMaskInput
          mask='+{7} (000) 000-00-00'
          placeholder='+7 (___) ___-__-__'
          id={id}
          className={inputClassName}
          inputRef={ref}
          type='text'
          inputMode='tel'
          unmask={true}
          onAccept={(value) => onChange?.(value)}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          required={required}
          aria-required={required}
          disabled={disabled}
          aria-disabled={disabled}
        />

        {errorMessage && <FieldErrorMessage message={errorMessage} hasError={hasError} />}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
