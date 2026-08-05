import clsx from "clsx";

import { type TArtistFormPersonalField } from "../../../utils/types";
import styles from "./FieldLabel.module.scss";

export const FieldLabel = ({
  field,
  forField,
}: {
  field: TArtistFormPersonalField;
  forField: string;
}) => {
  return (
    <div className={styles.labelContainer}>
      <label
        className={clsx(styles.labelContainer__label, styles.labelContainer__label_size_small)}
        htmlFor={forField}
      >
        {field.title}
      </label>
      {field.required && (
        <span className={clsx("labelContainer__markRequired", styles.markRequired)}>*</span>
      )}
    </div>
  );
};
