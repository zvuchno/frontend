"use client";

import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import styles from "./profileForm.module.scss";
import { type FieldValues, type TProfileFormUIProps } from "./types";

export const ProfileFormUI = ({
  children,
  className,
  errorMessage,
  has_usable_password,
  onSubmit,
  onError,
  onUpdatePassword,
}: TProfileFormUIProps) => {
  const { handleSubmit } = useFormContext<FieldValues>();

  return (
    <form
      className={clsx(styles.form, className)}
      onSubmit={(event) => {
        void handleSubmit(onSubmit, onError)(event);
      }}
    >
      <div className={styles.formContentWrapper}>
        <div className={styles.formContent}>{children}</div>
        {onUpdatePassword && (
          <button type='button' className={styles.passwordButton} onClick={onUpdatePassword}>
            <span className={styles.passwordButton__text}>
              {has_usable_password ? "Изменить пароль" : "Установить пароль"}
            </span>
          </button>
        )}
      </div>

      {errorMessage && <p className={styles.formError}>{errorMessage}</p>}
    </form>
  );
};
