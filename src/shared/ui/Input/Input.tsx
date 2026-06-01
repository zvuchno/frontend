import { forwardRef } from "react";
import { InputProps } from "./Input.types";
import clsx from "clsx";
import { IMaskInput } from "react-imask";

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
    inputType = 'text',
    onChangePhone,
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
        ) : inputType === 'text' ? (
          <input
            id={id}
            className={inputClassName}
            style={style}
            type="text"
            ref={ref as React.Ref<HTMLInputElement>}
            {...otherProps}
          />
        ) : (
          <IMaskInput
            mask="+{7} (000) 000-00-00"
            placeholder="+7 (___) ___-__-__"
            id={id}
            className={inputClassName}
            style={style}
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            inputMode="tel"
            unmask={false}
            onChange={onChangePhone}
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