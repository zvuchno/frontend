"use client"

import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import { ButtonUI } from "@/shared/ui";

import styles from "./profileForm.module.scss";
import { type FieldValues, type TProfileFormUIProps } from "./types";

export const ProfileFormUI = ({
  children,
  className,
  title = "Профиль",
  isChecked = false,
  isOnChange = true,
  isSubmitting = false,
  errorMessage,
  has_usable_password = false,
  onSubmit,
  onError,
  onEdit,
  onUpdatePassword,
}: TProfileFormUIProps) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <form
      className={clsx(styles.form, className)}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className={styles.formContentWrapper}>
        <h3 className={styles.formTitle}>{title}</h3>
        <div className={styles.formContent}>{children}</div>
        {onUpdatePassword && (
          <button type='button' className={styles.passwordButton} onClick={onUpdatePassword}>
            <span className={styles.passwordButton__text}>
              {has_usable_password ? 'Изменить пароль' : 'Установить пароль'}
            </span>
          </button>
        )}
      </div>

      {errorMessage && <p className={styles.formError}>{errorMessage}</p>}

      <div className={styles.formButtons}>
        <ButtonUI
          size='standart'
          variant='primary'
          disabled={isSubmitting || !isChecked || Object.keys(errors).length > 0}
          type='submit'
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </ButtonUI>

        <ButtonUI
          size='standart'
          variant='secondary'
          onClick={onEdit}
          disabled={isOnChange || isSubmitting}
          type='button'
        >
          Изменить
        </ButtonUI>
      </div>
    </form>
  );
};
