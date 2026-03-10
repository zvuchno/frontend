import { forwardRef } from "react";
import { InputProps } from "./Input.types";
import clsx from "clsx";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    id,
    label,
    error = false,
    message,
    inputSize = 'small',
    style,
    multiline = false,
    rows = 5,
    ...otherProps
  }, 
    ref
  ) => {
    const inputClassName = clsx('input', { ['error']: error }, [`input_size_${inputSize}`]);
    const labelClassName = clsx('labelContainer__label', [`labelContainer__label_size_${inputSize}`], { ['labelContainer__label_size_large']: multiline});
      
    return (
      <div className={clsx('field', { ['field_multiline']: multiline })}>

        {label && (
          <div className={'labelContainer'}>
            <label className={labelClassName} htmlFor={id}>{label}</label>
            {otherProps.required && <span className={'labelContainer__markRequired'}>*</span>}
        </div>
        )}

        {multiline ? (
          <textarea
            id={id}
            className={'input_multiline'}
            style={style}
            placeholder={otherProps.placeholder}
            rows={rows}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            
          />
        ) : (
          <input
            id={id}
            className={inputClassName}
            style={style}
            type="text"
            ref={ref as React.Ref<HTMLInputElement>}
            {...otherProps}
          />
        )}
        
        {message && (
          <span className={clsx('message', { ['error']: error })}>{message}</span>
        )}
      </div>
    )
  }
);

export default Input;