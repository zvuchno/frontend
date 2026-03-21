import { FC } from "react";
import { FieldValues, TProfileFormFieldsProps } from "../types";
import styles from './profileFormListener.module.scss';
import Input from "@/shared/ui/Input/Input";
import { FieldError, useFormContext } from "react-hook-form";
import { listenerFormFields } from "@/features/profile/utils/constants";
import { InputPhone } from "../inputPhone";
import { registerRules } from "@/features/profile/utils/validation";

export const ProfileFormListenerUI: FC<TProfileFormFieldsProps> = ({fieldsDisabled = false}) => { 
  const { register, formState: {errors} } = useFormContext<FieldValues>();
  const fields = listenerFormFields;

  return (
    <div className={styles.listenerForm}>
      {fields.map((field) => {
        const fieldError = errors[field.name] as FieldError;
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
