"use client"

import { type FieldError, get, useFormContext } from "react-hook-form";

import { CustomInput } from "@/shared/ui";

import { artistFormFields } from "../../../utils/constants";
import { registerRules } from "../../../utils/validation";
import { InputPhone } from "../inputPhone";
import type { FieldValues, TProfileFormFieldsProps } from "../types";
import styles from "./profileFormArtist.module.scss";

export const ProfileFormArtistUI = (props: TProfileFormFieldsProps) => {
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
        const isFieldDisabled = Boolean(fieldsDisabled || disabledFields?.includes(field.name));

        return (
          <div className={`cell-${field.row}-${field.column}`} key={field.name}>
            {field.type === "tel" ? (
              <InputPhone field={field} disabled={isFieldDisabled} />
            ) : field.name === "url" ? (
              <CustomInput
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
            ) : (
              <CustomInput
                {...register(field.name, registerRules(field))}
                id={`${field.row}.${field.column}`}
                type={field.type}
                label={field.title}
                placeholder={field.placeholder}
                style={field.name !== 'description' ? {
                  height: "40px",
                } : {
                  resize: "none",
                }}
                error={!!fieldError}
                message={fieldError?.message}
                disabled={isFieldDisabled}
                aria-disabled={isFieldDisabled}
                required={field.required}
                aria-required={field.required}
                multiline={field.name === 'description'}
              />
            )}
          </div>
        );
      })}
      {props.showPublishHint !== false && (
        <p className={styles.hint}>
          Чтобы ваш профиль стал публичным для всех пользователей не забудьте заполнить{" "}
          <a className={styles.link} href={props.personalDataHref ?? "/artist/data"}>
            Личные данные
          </a>
        </p>
      )}
    </div>
  );
};
