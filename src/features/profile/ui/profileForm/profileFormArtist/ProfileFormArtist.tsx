import { FC } from "react";
import styles from "./profileFormArtist.module.scss";
import { FieldValues, TProfileFormFieldsProps } from "../types";
import Input from "@/shared/ui/Input/Input";
import { artistFormFields } from "@/features/profile/utils/constants";
import { InputPhone } from "../inputPhone";
import { FieldError, get, useFormContext } from "react-hook-form";
import { registerRules } from "@/features/profile/utils/validation";

export const ProfileFormArtistUI: FC<TProfileFormFieldsProps> = (props) => {
  const { fieldsDisabled = false, disabledFields } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const fields = artistFormFields;

  return (
    <div className={styles.artistForm}>
      {fields.map((field) => {
        const fieldError = get(errors, field.name) as FieldError;
        const isFieldDisabled = Boolean(
          fieldsDisabled || disabledFields?.includes(field.name),
        );

        return (
          <div className={`cell-${field.row}-${field.column}`} key={field.name}>
            {field.type === "tel" ? (
              <InputPhone field={field} disabled={isFieldDisabled} />
            ) : (
              <Input
                {...register(field.name, registerRules(field))}
                id={`${field.row}.${field.column}`}
                type={field.type}
                label={field.title}
                placeholder={field.placeholder}
                style={{
                  height: "40px",
                }}
                error={!!fieldError}
                message={fieldError?.message}
                disabled={isFieldDisabled}
                aria-disabled={isFieldDisabled}
                required={field.required}
                aria-required={field.required}
              />
            )}
          </div>
        );
      })}
      {props.showPublishHint !== false && (
        <p className={styles.hint}>
          Чтобы ваш профиль стал публичным для всех пользователей не забудьте
          заполнить{" "}
          <a className={styles.link} href={props.personalDataHref}>
            Личные данные
          </a>
        </p>
      )}
    </div>
  );
};
