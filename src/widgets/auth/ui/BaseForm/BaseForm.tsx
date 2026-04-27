import { FormEvent } from "react";
import { Typography } from "@/shared/ui/Typography/Typography";
import { ButtonUI } from "@/shared/ui/button/ButtonUI";
import { CloseButtonIconX } from "@/shared/ui/icons/closeButtonIconX";
import clsx from "clsx";
import s from "./BaseForm.module.scss";
import { BaseFormProps } from "./BaseForm.types";

export const BaseForm = ({
  title,
  onSubmit,
  onClose,
  renderFields,
  renderPrimaryButton,
  renderSecondaryButton,
  renderSocialLogin,
  children,
  className,
  isLoading = false,
}: BaseFormProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.({});
  };

  return (
    <div className={clsx(s.baseForm, className)}>
      <div className={s.baseForm__wrapper}>
        {" "}
        {onClose && (
          <button
            type="button"
            className={s.baseForm__close}
            onClick={onClose}
            aria-label="Закрыть"
          >
            {CloseButtonIconX()}
          </button>
        )}
      </div>
      <header className={s.baseForm__header}>
        <Typography Tag="h2" variant="title" className={s.baseForm__title}>
          {title}
        </Typography>
      </header>

      <form className={s.baseForm__body} onSubmit={handleSubmit}>
        {renderFields && (
          <div className={s.baseForm__fields}>{renderFields()}</div>
        )}

        {renderPrimaryButton && (
          <div className={s.baseForm__primary}>
            {renderPrimaryButton(isLoading)}
          </div>
        )}

        {renderSecondaryButton && (
          <div className={s.baseForm__secondary}>{renderSecondaryButton()}</div>
        )}

        {(children || renderSocialLogin) && (
          <div className={s.baseForm__social}>
            <Typography
              Tag="span"
              variant="normal"
              className={s.baseForm__socialTitle}
            >
              Войти с помощью
            </Typography>
            {children ?? renderSocialLogin?.()}
          </div>
        )}
      </form>
    </div>
  );
};

BaseForm.displayName = "BaseForm";
