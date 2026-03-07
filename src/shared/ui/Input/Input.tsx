import { forwardRef } from "react";
import { InputProps } from "./Input.types";
import s from './Input.module.scss';
import clsx from "clsx";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    id,
    placeholder,
    isRequired,
    label,
    error = false,
    message,
    inputSize = 'small',
    style,
    multiline = false,
    rows = 5,
  }, 
    ref
  ) => {
    const inputClassName = clsx(s.input, { [s.error]: error }, s[`input_size_${inputSize}`]);
    const labelClassName = clsx(s.labelContainer__label, s[`labelContainer__label_size_${inputSize}`]);
      
    return (
      <div className={clsx(s.field, { [s.field_multiline]: multiline })}>

        <div className={s.labelContainer}>
          {label && <label className={labelClassName} htmlFor={id}>{label}</label>}
          {isRequired && <span className={s.labelContainer__markRequired}>*</span>}
        </div>

        {multiline ? (
          <textarea
            id={id}
            className={s.input_multiline}
            style={style}
            placeholder={placeholder}
            rows={rows}
            ref={ref as React.Ref<HTMLTextAreaElement>}
          />
        ) : (
          <input
            id={id}
            className={inputClassName}
            style={style}
            placeholder={placeholder}
            type="text"
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
        
        {message && (
          <span className={clsx(s.message, { [s.error]: error })}>{message}</span>
        )}
      </div>
    )
  }
);

export default Input;