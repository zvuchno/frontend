import { type TextareaHTMLAttributes, forwardRef } from "react";

import clsx from "clsx";

import s from "./CustomInput.module.scss";
import { type InputProps } from "./CustomInput.types";
import { FieldErrorMessage } from "./FieldErrorMessage/FieldErrorMessage";

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error = false,
      message,
      inputSize = "small",
      style,
      multiline = false,
      rows = 5,
      className,
      labelClassName,
      inputClassName,
      messageSize = "large",
      ...otherProps
    },
    ref
  ) => {
    const inputsClassName = clsx(s.input, { [s.error]: error }, s[`input_size_${inputSize}`]);
    const labelsClassName = clsx(
      s.labelContainer__label,
      s[`labelContainer__label_size_${inputSize}`],
      { [s.labelContainer__label_size_large]: multiline }
    );

    return (
      <div className={clsx(s.field, { [s.field_multiline]: multiline }, className)}>
        {label && (
          <div className={s.labelContainer}>
            <label className={clsx(labelsClassName, labelClassName)} htmlFor={id}>
              {label}
            </label>
            {otherProps.required && <span className={s.labelContainer__markRequired}>*</span>}
          </div>
        )}

        {multiline ? (
          <textarea
            id={id}
            className={clsx(s.input, s.input_multiline, inputClassName)}
            style={style}
            placeholder={otherProps.placeholder}
            rows={rows}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(otherProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            className={clsx(inputsClassName, inputClassName)}
            style={style}
            ref={ref}
            autoComplete='off'
            {...otherProps}
          />
        )}

        {message && <FieldErrorMessage message={message} hasError={error} size={messageSize} />}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
