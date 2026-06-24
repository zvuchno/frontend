"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import s from "./PasswordInput.module.scss";
import clsx from "clsx";

const IconVision = ({ showPassword }: { showPassword: boolean }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.713 6.723C3.665 8.795 2 12 2 12s3.636 7 10 7c2.05 0 3.817-.727 5.271-1.712M11 5.058A9 9 0 0 1 12 5c6.364 0 10 7 10 7s-.692 1.332-2 2.834"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 14.236a3 3 0 0 1-4.13-4.348"
      />
      {!showPassword && (
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m2 2 20 20"
        />
      )}
    </svg>
  )
};

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: boolean;
  message?: string;
  style?: React.CSSProperties;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ 
    id,
    label,
    error,
    message,
    style,
    ...otherProps
  }, 
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputClassName = clsx(s.input, { [s.error]: error });

    return (
      <div className={s.field}>
        {label && (
          <div className={s.labelContainer}>
            <label className={s.labelContainer__label} htmlFor={id}>{label}</label>
            {otherProps.required && <span className={s.labelContainer__markRequired}>*</span>}
          </div>
        )}

        <div className={s.inputContainer}>
          <input
            id={id}
            className={inputClassName}
            style={style}
            type={showPassword ? 'text' : 'password'}
            ref={ref as React.Ref<HTMLInputElement>}
            {...otherProps}
          />
          <button 
            type="button" 
            className={s.inputContainer__button}
            onClick={() => setShowPassword(!showPassword)}
          >
            <IconVision showPassword={showPassword} />
          </button>
        </div>

        {message && (
          <span className={clsx(s.message, { [s.error]: error })}>{message}</span>
        )}
      </div>
    )
  }
);