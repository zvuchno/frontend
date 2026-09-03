import { Controller, type FieldError, get, type useFormContext } from "react-hook-form";

import clsx from "clsx";

import { parseServerDate } from "@/shared/utils/formatDate";

import styles from "../artistFormPersonal.module.scss";
import { type FieldValues, type TArtistFormPersonalField } from "../utils/types";
import { artistFormPersonalRules } from "../utils/validation";
import { CalendarField } from "./components/CalendarField";
import { FieldLabel } from "./components/FieldLabel/FieldLabel";
import { FieldWithOptions } from "./components/FieldWithOptions";
import { PhoneField } from "./components/PhoneField";
import { RegularField } from "./components/RegularField";

export const createFormField = (
  field: TArtistFormPersonalField,
  fieldSet: number,
  methods: ReturnType<typeof useFormContext<FieldValues>>,
  disabled: boolean
) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = methods;

  const fieldError = get(errors, field.name) as FieldError;

  return (
    <div className={styles[`cell-${field.row}-${field.column}`]} key={`${field.name}-${fieldSet}`}>
      {field.type === "date" || field.type === "tel" ? (
        <Controller
          control={control}
          shouldUnregister={false}
          name={field.name}
          rules={artistFormPersonalRules(field) as Record<string, undefined>}
          render={({ field: { onChange, value, name, ref, onBlur } }) => {
            //const isFieldDirty = Boolean(get(dirtyFields, name));
            //const isFieldTouched = Boolean(get(touchedFields, name));

            const showError = !disabled;
            const currentFieldError = get(errors, name) as FieldError | undefined;
            const dateValue = field.type === "date" ? parseServerDate(value) : null;
            const phoneValue =
              field.type === "tel" && typeof value === "string" ? value.replace(/\D/g, "") : "";
            return (
              <div
                style={{ position: "relative" }}
                className={clsx(
                  "field",
                  { ["error"]: showError && !!currentFieldError },
                  { ["calendar"]: field.type === "date" }
                )}
              >
                <FieldLabel field={field} forField={`${field.row}.${field.column}`} />
                {field.type === "date" && (
                  <>
                    <CalendarField
                      field={field}
                      fieldError={showError ? currentFieldError : undefined}
                      value={dateValue}
                      onChange={(selectedDate: Date | null) => {
                        if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
                          const year = selectedDate.getFullYear();
                          const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
                          const day = String(selectedDate.getDate()).padStart(2, "0");
                          onChange(`${year}-${month}-${day}`);
                        } else {
                          onChange(null);
                        }
                        if (field.name === "identity_data.birth_date")
                          void trigger("identity_data.passport_issue_date");
                      }}
                      onBlur={onBlur}
                    />
                  </>
                )}
                {field.type === "tel" && (
                  <PhoneField
                    field={field}
                    fieldError={fieldError}
                    value={phoneValue}
                    onChange={onChange}
                    ref={ref}
                    onBlur={onBlur}
                  />
                )}
                {showError && currentFieldError && (
                  <span
                    className='message error'
                    style={{
                      position: "absolute",
                      letterSpacing: "-0.06em",
                      color: "var(--color-primary-blue)",
                    }}
                  >
                    {currentFieldError.message}
                  </span>
                )}
              </div>
            );
          }}
        />
      ) : field.options ? (
        <FieldWithOptions field={field} hasError={!disabled && !!fieldError} methods={methods} />
      ) : (
        <RegularField
          field={field}
          fieldError={!disabled ? fieldError : undefined}
          methods={methods}
          className={styles.height_100}
        />
      )}
    </div>
  );
};
