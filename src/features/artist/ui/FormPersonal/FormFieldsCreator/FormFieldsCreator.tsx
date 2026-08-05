import { Controller, type FieldError, get, type useFormContext } from "react-hook-form";

import clsx from "clsx";

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
  methods: ReturnType<typeof useFormContext<FieldValues>>
) => {
  const {
    control,
    formState: { errors },
  } = methods;

  const fieldError = get(errors, field.name) as FieldError;

  return (
    <div className={styles[`cell-${field.row}-${field.column}`]} key={`${field.name}-${fieldSet}`}>
      {field.type === "date" || field.type === "tel" ? (
        <Controller
          control={control}
          name={field.name}
          rules={artistFormPersonalRules(field) as Record<string, undefined>}
          render={({ field: { onChange, value, name, ref, onBlur } }) => {
            const fieldError = get(errors, name) as FieldError | undefined;
            return (
              <div
                style={{ position: "relative" }}
                className={clsx(
                  "field",
                  { ["error"]: !!fieldError },
                  { ["calendar"]: field.type === "date" }
                )}
              >
                <FieldLabel field={field} forField={`${field.row}.${field.column}`} />
                {field.type === "date" && (
                  <CalendarField
                    field={field}
                    fieldError={fieldError}
                    value={value instanceof Date ? value : null}
                    onChange={onChange}
                  />
                )}
                {field.type === "tel" && (
                  <PhoneField
                    field={field}
                    value={(value as string) || ""}
                    onChange={onChange}
                    ref={ref}
                    onBlur={onBlur}
                  />
                )}
                {fieldError && (
                  <span
                    className='message error'
                    style={{
                      position: "absolute",
                      letterSpacing: "-0.06em",
                      color: "var(--color-primary-blue)",
                    }}
                  >
                    {fieldError.message}
                  </span>
                )}
              </div>
            );
          }}
        />
      ) : field.options ? (
        <FieldWithOptions field={field} hasError={!!fieldError} methods={methods} />
      ) : (
        <RegularField
          field={field}
          fieldError={fieldError}
          methods={methods}
          className={styles.height_100}
        />
      )}
    </div>
  );
};
