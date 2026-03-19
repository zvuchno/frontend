import { FC } from 'react';
import styles from './profileFormArtist.module.scss';
import { TProfileFormFieldsProps } from "../types";
import Input from "@/shared/ui/Input/Input";
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import clsx from 'clsx';

export const ProfileFormArtistUI: FC<TProfileFormFieldsProps> = ({fields, fieldsDisabled}) => { 
  const { register, control, formState: {errors} } = useFormContext();

  return (
    <div className={styles.artistForm}>
      {fields.map((field) => {
        const fieldError = errors[field.name];
        return (
          <div 
            className={`cell-${field.row}-${field.column}`}
            key={field.name}
          >
            {field.type === 'tel' ? (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, value, ref } }) => (
                  <div className={clsx('field', { ['error']: !!fieldError })}>
                    {field.title && (
                      <div className={'labelContainer'}>
                        <label 
                          className={clsx(
                            'labelContainer__label',
                            'labelContainer__label_size_small')} 
                          htmlFor={`${field.row}.${field.column}`}>
                          {field.title}
                        </label>
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
                      onAccept={(val) => onChange(val)}
                      inputRef={ref}
                      className={clsx('input', 'input_size_small', {['error']: !!fieldError})} 
                      style={{ height: '40px' }}
                      id={`${field.row}.${field.column}`}
                      disabled={fieldsDisabled}
                    />
                    {fieldError && (
                      <span className={clsx('message', 'error')}>
                        {fieldError.message as string}
                      </span>
                    )}
                  </div>
                )}
              />
            ) : (
              <Input 
                {...register(field.name)}
                id={`${field.row}.${field.column}`}
                type={field.type}
                label={field.title} 
                placeholder={field.placeholder}
                style={{
                  height: '40px',
                }}
                error={!!fieldError}
                message={fieldError?.message as string}
                disabled={fieldsDisabled}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
