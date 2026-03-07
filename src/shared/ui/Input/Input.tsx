import { forwardRef } from "react";
import { InputProps } from "./Input.types";
import s from './Input.module.scss';
import clsx from "clsx";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, error, 
    innerRef, 
    id,
    value,
    isHighlighted, 
    hintText,
    inputSize = 'small',
    isRequired,
    ...otherProps 
  }, 
    ref
  ) => {
    const inputClassName = clsx(s.input, { [s.input_highlighted]: isHighlighted }, { [s.error]: error }, s[`input_${inputSize}`], className);
      
    return (
      <div className={s.field}>
        {label && <label className={clsx(s.label, s[`label_${inputSize}`])} htmlFor={id}>{label}</label>}
        {isRequired && (
          <span className={s.required}>*</span>
        )}
        <input
          id={id}
          value={value}
          className={clsx(s.input, { [s.input_highlighted]: isHighlighted }, { [s.error]: error }, className)}
          ref={innerRef ? innerRef : ref}
          type="text"
          {...otherProps}
        />
        {hintText && (
          <span>{hintText}</span>
        )}
      </div>
    )
  }
);

export default Input;