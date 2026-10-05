import clsx from "clsx";

import styles from "./FieldLabel.module.scss";

export const FieldLabel = ({
  field,
  forField,
  className,
}: {
  field?: { title?: string; required?: boolean };
  forField?: string;
  className?: string;
}) => {
  return (
    <div className={clsx(styles.labelContainer)}>
      <label
        className={clsx(
          styles.labelContainer__label,
          styles.labelContainer__label_size_small,
          className
        )}
        htmlFor={forField}
      >
        {field?.title ?? "Наименование поля не задано"}
      </label>
      {field?.required && (
        <span className={clsx("labelContainer__markRequired", styles.markRequired)}>*</span>
      )}
    </div>
  );
};
