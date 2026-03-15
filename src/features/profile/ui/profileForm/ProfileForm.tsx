import { FC } from "react";
import { TProfileFormUIProps } from "./types";
import styles from './profileForm.module.scss';
import { ButtonUI } from "@/shared/ui/button";

export const ProfileForm: FC<TProfileFormUIProps> = (
  {
    children,
    requestStatus,
    className,
    title = 'Профиль',
    error,
    onChange,
    onSubmit,
    noValidate,
    ...restProps
  }) => (
    <>
      <form className={styles.form} action='' onSubmit={()=>{}}>
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
            className={styles.formSubmitButton} 
            onClick={()=>{}}
          />
          <ButtonUI 
            size='standart' 
            variant='secondary' 
            children={'Изменить'}
            className={styles.formChangeButton}
            onClick={()=>{}}
          />
        </div>
      </form>
    </>
  );
