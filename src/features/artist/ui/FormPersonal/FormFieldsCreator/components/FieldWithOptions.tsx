import { type FieldPath, type UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { type TArtistLegalData } from "@/entities/Artist/store/types";

import styles from "../../artistFormPersonal.module.scss";
import { issuerCodeFormatter } from "../../utils/issuerCodeFormatter";
import { type FieldValues, type TArtistFormPersonalField } from "../../utils/types";
import { artistFormPersonalRules } from "../../utils/validation";

export const FieldWithOptions = ({
  field,
  hasError,
  methods,
}: {
  field: TArtistFormPersonalField;
  hasError: boolean;
  methods: UseFormReturn<TArtistLegalData, undefined, TArtistLegalData>;
}) => {
  const currentValue = methods.watch(field.name as FieldPath<FieldValues>);

  const { onChange, ...registerRest } = methods.register(
    field.name,
    artistFormPersonalRules(field) as TArtistFormPersonalField
  );

  return (
    <div className={clsx(styles.field, { [styles.error]: hasError })}>
      <div className={styles.labelContainer}>
        <label
          htmlFor={`${field.row}.${field.column}`}
          className={clsx(styles.labelContainer__label, styles.labelContainer__label_size_small)}
        >
          {field.title}
        </label>
        {field.required && (
          <span className={clsx(styles.labelContainer__markRequired, styles.markRequired)}>*</span>
        )}
      </div>
      <select
        {...registerRest}
        id={`${field.row}.${field.column}`}
        name={field.name}
        style={{
          height: "40px",
          paddingBlock: "10px",
          color:
            !currentValue || currentValue === "individual_temporary"
              ? "rgba(16, 15, 13, 0.4)"
              : "inherit",
          borderColor:
            !currentValue || currentValue === "individual_temporary"
              ? "var(--color-primary-blue)"
              : "inherit",
        }}
        className={clsx(styles.input, styles.input_size_small, {
          [styles.error]: hasError,
        })}
        disabled={field.disabled}
        aria-disabled={field.disabled}
        required={field.required}
        aria-required={field.required}
        onChange={(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
          void onChange(e);
          issuerCodeFormatter(field, e);
        }}
        defaultValue=''
      >
        <option className={styles.option} value='individual_temporary' disabled>
          {field.placeholder}
        </option>
        {field.options?.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
    </div>
  );
};
