import { Controller, FieldError, get, useFormContext } from "react-hook-form"
import { FieldValues, TProfileFormField } from "../types";
import clsx from "clsx";
import { IMaskInput } from "react-imask";
import { FC } from "react";
import { registerRules } from "@/features/profile/utils/validation";

type TIputPhoneProps = {
  field: TProfileFormField, 
  disabled: boolean,
}

export const InputPhone: FC<TIputPhoneProps> = ({ field, disabled }) => {
  const { control, formState: {errors} } = useFormContext<FieldValues>();
  const fieldError = get(errors, field.name) as FieldError;  
  
  return (
    <Controller
      control={control}
      name={field.name}
      rules={registerRules(field)}
      render={({ field: { onChange, value, ref, onBlur } }) => (
        <div className={clsx('field', { ['error']: !!fieldError })}>
          {field.title && (
            <div className='labelContainer'>
              <label 
                className='labelContainer__label labelContainer__label_size_small'
                htmlFor={`${field.row}.${field.column}`}>
                {field.title}
              </label>
              {field.required && <span className='labelContainer__markRequired'>*</span>}
            </div>
          )}
          <IMaskInput
            mask="+{7}(000)000-00-00"
            lazy={false}
            placeholderChar="_"
            value={value || ''}
            type='text'
            inputMode='tel'
            unmask={true} 
            onAccept={(val) =>
              onChange(val)
            }
            onBlur={onBlur}
            inputRef={ref}
            className={clsx('input input_size_small', {['error']: !!fieldError})} 
            style={{ height: '40px' }}
            id={`${field.row}.${field.column}`}
            disabled={disabled}
            aria-disabled={disabled}
            required={field.required}
            aria-required={field.required}
          />
          {fieldError ? (
            <span className='message error'>{fieldError.message}</span>
            ) : null}
        </div>
      )}
    />
  )
}