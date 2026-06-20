'use client'

import clsx from "clsx";
import { forwardRef } from "react";
import s from "./PhoneInput.module.scss";
import { IMaskInput } from "react-imask";

interface PhoneInputProps {
  id: string;
  value: string;
  label: string;
  inputSize?: 'small' | 'large';
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
  ({
    id,
    label,
    hasError = false,
    errorMessage,
    inputSize = 'small',
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
      inputSize === 'small' ? s.input_size_small : s.input_size_large,
      className
    );

    const labelClassName = clsx(
      s.labelContainer__label, 
      inputSize === 'small' ? s.labelContainer__label_size_small : s.labelContainer__label_size_large
    );
      
    return (
      <div className={s.field}>

        {label && (
          <div className={s.labelContainer}>
            <label className={labelClassName} htmlFor={id}>{label}</label>
            {required && <span className={s.labelContainer__markRequired}>*</span>}
        </div>
        )}

        <IMaskInput
          mask="+{7} (000) 000-00-00"
          placeholder="+7 (___) ___-__-__"
          id={id}
          className={inputClassName}
          inputRef={ref as React.Ref<HTMLInputElement>}
          type="text"
          inputMode="tel"
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
        
        {errorMessage && (
          <span className={clsx(s.message, { [s.error]: hasError })}>{errorMessage}</span>
        )}
      </div>
    )
  }
);

PhoneInput.displayName = "PhoneInput";