import { FC } from 'react';
import styles from './profileFormArtist.module.scss';
import { FieldValues, TProfileFormFieldsProps } from "../types";
import Input from "@/shared/ui/Input/Input";
import { artistFormFields } from '@/features/profile/utils/constants';
import { InputPhone } from '../inputPhone';
import { FieldError, get, useFormContext } from 'react-hook-form';
import { registerRules } from '@/features/profile/utils/validation';

export const ProfileFormArtistUI: FC<TProfileFormFieldsProps> = ({fieldsDisabled = false}) => { 
  const { register, formState: {errors} } = useFormContext<FieldValues>();
  const fields = artistFormFields;
  
  return (
    <div className={styles.artistForm}>
      {fields.map((field) => {
        const fieldError = get(errors, field.name) as FieldError;
        return (
          <div 
            className={`cell-${field.row}-${field.column}`}
            key={field.name}
          >
            {field.type === 'tel' ? (
              <InputPhone
                field={field} 
                disabled={fieldsDisabled} 
              />       
            ) : (
              <Input 
                {...register( field.name, registerRules(field))}
                id={`${field.row}.${field.column}`}
                type={field.type}
                label={field.title} 
                placeholder={field.placeholder}
                style={{
                  height: '40px',
                }}
                error={!!fieldError}
                message={fieldError?.message}
                disabled={fieldsDisabled}
                aria-disabled={fieldsDisabled}
                required={field.required}
                aria-required={field.required}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}