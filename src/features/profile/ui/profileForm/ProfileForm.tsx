import { FC } from "react";
import { useFormContext } from "react-hook-form";

import { ButtonUI } from "@/shared/ui/button";

import { FieldValues, TProfileFormUIProps } from "./types";
import styles from "./profileForm.module.scss";

export const ProfileFormUI: FC<TProfileFormUIProps> = ({
  children,
  title = "Профиль",
  isChecked = false,
  isOnChange = true,
  isSubmitting = false,
  errorMessage,
  onSubmit,
  onError,
  onEdit,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
      <div className={styles.formContentWrapper}>
        <h3 className={styles.formTitle}>{title}</h3>
        <div className={styles.formContent}>{children}</div>
      </div>

      {errorMessage && <p className={styles.formError}>{errorMessage}</p>}

      <div className={styles.formButtons}>
        <ButtonUI
          size="standart"
          variant="primary"
          disabled={
            isSubmitting || !isChecked || Object.keys(errors).length > 0
          }
          type="submit"
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </ButtonUI>

        <ButtonUI
          size="standart"
          variant="secondary"
          onClick={onEdit}
          disabled={isOnChange || isSubmitting}
          type="button"
        >
          Изменить
        </ButtonUI>
      </div>
    </form>
  );
};
