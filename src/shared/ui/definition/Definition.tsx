import clsx from "clsx";

import styles from "./Definition.module.scss";
import type { DefinitionProps } from "./Definition.types";

export function Definition({ label, value, className }: DefinitionProps) {
  return (
    <div className={clsx(styles.definition, className)}>
      <dt className={styles.definition__term}>{label}</dt>
      <dd className={styles.definition__description}>{value}</dd>
    </div>
  );
}
