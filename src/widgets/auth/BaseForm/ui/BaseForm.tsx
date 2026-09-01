import { type FormEvent } from "react";
import { Typography } from "@/shared/ui";
import s from "./BaseForm.module.scss";
import { type BaseFormProps } from "../model/BaseForm.types";

export const BaseForm = ({
  title,
  onSubmit,
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
    <form className={s.baseForm__body} onSubmit={handleSubmit} autoComplete="off">
        <Typography Tag="h2" variant="title" className={s.baseForm__title}>
          {title}
        </Typography>
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
  );
};

BaseForm.displayName = "BaseForm";
