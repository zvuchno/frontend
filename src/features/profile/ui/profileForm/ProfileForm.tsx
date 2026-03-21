import { FC } from "react";
import { FieldValues, TProfileFormUIProps } from "./types";
import styles from './profileForm.module.scss';
import { ButtonUI } from "@/shared/ui/button";
import { useFormContext } from "react-hook-form";

export const ProfileFormUI: FC<TProfileFormUIProps> = ({
  children,
  title = 'Профиль',
  isChecked = false,
  isOnChange = true,
  onSubmit,
  onError,
  onEdit
}) => {
  const { handleSubmit, formState: { errors } } = useFormContext<FieldValues>();
 
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles.formContentWrapper}>
          <h3 className={styles.formTitle}>{title}</h3>
          <div className={styles.formContent}>
            {children}
          </div>
        </div>
        <div className={styles.formButtons}>
          <ButtonUI 
            size='standart' 
            variant='primary' 
            children={'Сохранить'}
            disabled={!isChecked || errors && Object.keys(errors).length > 0}
            type='submit'
          />
          <ButtonUI 
            size='standart' 
            variant='secondary' 
            children={'Изменить'}
            onClick={onEdit}
            disabled={isOnChange}
            type='button'
          />
        </div>
      </form>
    </>
  )
}
