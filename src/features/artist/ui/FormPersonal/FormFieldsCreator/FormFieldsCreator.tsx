import {
  Controller,
  FieldError,
  FieldPath,
  get,
  useFormContext,
} from "react-hook-form";
import { FieldValues, TArtistFormPersonalField } from "../utils/types";
import { artistFormPersonalRules } from "../utils/validation";
import styles from "../artistFormPersonal.module.scss";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { IMaskInput } from "react-imask";
import Input from "@/shared/ui/Input/Input";

export const createFormField = (
  field: TArtistFormPersonalField,
  fieldSet: number,
  methods: ReturnType<typeof useFormContext<FieldValues>>,
) => {
  const {
    register,
    control,
    formState: { errors },
  } = methods;
  
  const fieldError = get(errors, field.name) as FieldError;

  const { onChange, ...registerRest } = register(
    field.name as FieldPath<FieldValues>,
    artistFormPersonalRules(field),
  );

  const currentValue = methods.watch(field.name as FieldPath<FieldValues>);

  const issuerCodeFormatter = (
    field: TArtistFormPersonalField,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (field.name === "identity_data.passport_issued_by") {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length > 3) {
        e.target.value = `${value.slice(0, 3)}-${value.slice(3, 6)}`;
      } else {
        e.target.value = value;
      }
    }
  };

  return (
    <div
      className={styles[`cell-${field.row}-${field.column}`]}
      key={`${field.name}-${fieldSet}`}
    >
      {field.type === "date" || field.type === "tel" ? (
        <Controller
          control={control}
          name={field.name as FieldPath<FieldValues>}
          rules={artistFormPersonalRules(field)}
          render={({ field: { onChange, value, name, ref, onBlur } }) => {
            const fieldError = get(errors, name) as FieldError | undefined;
            return (
              <div
                className={clsx(
                  "field",
                  { ["error"]: !!fieldError },
                  { ["calendar"]: field.type === "date" },
                )}
              >
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
                {field.type === "date" && (
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
                )}
                {field.type === "tel" && (
                  <IMaskInput
                    mask="+{7}(000)000-00-00"
                    lazy={false}
                    placeholderChar="_"
                    value={(value as string) || ""}
                    type="text"
                    inputMode="tel"
                    unmask={true}
                    onAccept={(val) => onChange(val)}
                    onBlur={onBlur}
                    inputRef={ref}
                    className={clsx("input input_size_small", {
                      ["error"]: !!fieldError,
                    })}
                    style={{ height: "40px" }}
                    id={`${field.row}.${field.column}`}
                    disabled={field.disabled}
                    aria-disabled={field.disabled}
                    required={field.required}
                    aria-required={field.required}
                  />
                )}
                {fieldError && (
                  <span className="message error">{fieldError.message}</span>
                )}
              </div>
            );
          }}
        />
      ) : field.options ? (
        <div className={clsx("field", { ["error"]: !!fieldError })}>
          <div className={"labelContainer"}>
            <label
              htmlFor={field.name}
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
              color: !currentValue || currentValue === 'individual_temporary' ? 'rgba(16, 15, 13, 0.4)' : 'inherit',
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
            defaultValue=""
          >
            <option
              value="individual_temporary"
              disabled
            >
              {field.placeholder}
            </option>
            {field.options?.map((el) => (
              <option key={el.value} value={el.value}>
                {el.label}
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
