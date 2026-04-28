import { FC } from "react";
import {
  TArtistFormPersonalProps,
  FieldValues,
  TArtistFormPersonalField,
} from "./types";
import styles from "./artistFormPersonal.module.scss";
import { ButtonUI } from "@/shared/ui/button";
import {
  Controller,
  FieldError,
  FieldPath,
  get,
  useFormContext,
} from "react-hook-form";
import {
  artistPersonalMainFields,
  artistPersonalPasportFields,
  artistPersonalPaymentFields,
  taxSystem,
} from "./utils/constants";
import Input from "@/shared/ui/Input/Input";
import { artistFormPersonalRules } from "./utils/validation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { ru } from "date-fns/locale";
import clsx from "clsx";
import { fieldset } from "framer-motion/client";


export const ArtistFormPersonal: FC<TArtistFormPersonalProps> = ({
  title = "Личные данные",
  isChecked = false,
  isOnChange = true,
  onSubmit,
  onError,
  onEdit,
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const personalFields = artistPersonalMainFields;
  const passportFields = artistPersonalPasportFields;
  const paymentFields = artistPersonalPaymentFields;

  const issuerCodeFormatter = (
    field: TArtistFormPersonalField,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (field.name === "passport.issuerCode") {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length > 3) {
        e.target.value = `${value.slice(0, 3)}-${value.slice(3, 6)}`;
      } else {
        e.target.value = value;
      }
    }
  };

  const createFormField = (
    field: TArtistFormPersonalField,
    fieldSet: number,
  ) => {
    const fieldError = get(errors, field.name) as FieldError;
     const { onChange, ...registerRest } = register(
                field.name as FieldPath<FieldValues>,
                artistFormPersonalRules(field)
              );
    return (
      <div
        className={styles[`cell-${field.row}-${field.column}`]}
        key={field.name}
      >
        {field.type === "date" ? (
          <Controller
            control={control}
            name={field.name as FieldPath<FieldValues>}
            rules={artistFormPersonalRules(field)}
            render={({ field: { onChange, value, name, ref } }) => {
              const fieldError = get(errors, name) as FieldError | undefined;
              return (
                <div className={clsx("field", { ["error"]: !!fieldError })}>
                  <div className="labelContainer">
                    <label
                      className="labelContainer__label labelContainer__label_size_small"
                      htmlFor={name}
                    >
                      {field.title}
                    </label>
                    {field.required && (
                      <span
                        className={clsx(
                          "labelContainer__markRequired",
                          styles.markRequired,
                        )}
                      >
                        *
                      </span>
                    )}
                  </div>
                  <DatePicker
                    id={name}
                    className={clsx("input input_size_small", {
                      ["error"]: !!fieldError,
                    })}
                    wrapperClassName={styles.datePickerWrapper}
                    dateFormat="dd.MM.yyyy"
                    locale={ru}
                    selected={value instanceof Date ? value : null}
                    onChange={(date: Date | null) => onChange(date)}
                    placeholderText="дд.мм.гггг"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    showIcon
                  />
                  {fieldError && (
                    <span className="message error">{fieldError.message}</span>
                  )}
                </div>
              );
            }}
          />
        ) : field.name.includes("taxSystem") ? (
          <div className={clsx("field", { ["error"]: !!fieldError })}>
            <div className={"labelContainer"}>
              <label
                htmlFor="taxSystem"
                className="labelContainer__label labelContainer__label_size_small"
              >
                {field.title}
              </label>
              {field.required && (
                <span
                  className={clsx(
                    "labelContainer__markRequired",
                    styles.markRequired,
                  )}
                >
                  *
                </span>
              )}
            </div>
            <select
              {...registerRest}
              id={`${field.row}.${field.column}`}
              name={field.name}
              style={{
                height: "40px",
                paddingBlock: "10px",
              }}
              className={clsx("input input_size_small", {
                ["error"]: !!fieldError,
              })}
              disabled={field.disabled}
              aria-disabled={field.disabled}
              required={field.required}
              aria-required={field.required}
              onChange={(
                e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
              ) => {
                onChange(e as React.ChangeEvent<HTMLInputElement>);
                issuerCodeFormatter(field, e as any);
              }}
            >
              <option value="" disabled selected style={{ opacity: "40%" }}>
                {field.placeholder}
              </option>
              {taxSystem.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <Input
            {...register(
              field.name as FieldPath<FieldValues>,
              artistFormPersonalRules(field),
            )}
            id={`${field.row}.${field.column}`}
            type={field.type}
            label={field.title}
            placeholder={field.placeholder}
            style={{
              height: "40px",
            }}
            error={!!fieldError}
            message={fieldError?.message}
            disabled={field.disabled}
            aria-disabled={field.disabled}
            required={field.required}
            aria-required={field.required}
            onChange={(e) => {
              register(field.name).onChange(e);
              issuerCodeFormatter(field, e);
            }}
            maxLength={field.maxLength}
            minLength={field.minLength}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles.formContentWrapper}>
          <h3 className={styles.formTitle}>{title}</h3>
          <fieldset
            className={clsx(styles.formContent, styles.personalContent)}
          >
            <legend className={styles.visuallyHidden}>
              Персональная информация
            </legend>
            {personalFields.map(createFormField)}
          </fieldset>
          <fieldset
            className={clsx(styles.formContent, styles.passportlContent)}
          >
            <legend className={styles.visuallyHidden}>Паспортные данные</legend>
            {passportFields.map(createFormField)}
          </fieldset>
          <fieldset
            className={clsx(styles.formContent, styles.paymentlContent)}
          >
            <legend className={styles.visuallyHidden}>
              Платежная информация
            </legend>
            {paymentFields.map(createFormField)}
          </fieldset>
        </div>
        <div className={styles.formButtons}>
          <ButtonUI
            size="standart"
            variant="primary"
            children={"Сохранить"}
            disabled={!isChecked || (errors && Object.keys(errors).length > 0)}
            type="submit"
          />
          <ButtonUI
            size="standart"
            variant="secondary"
            children={"Изменить"}
            onClick={onEdit}
            disabled={isOnChange}
            type="button"
          />
        </div>
      </form>
    </>
  );
};
