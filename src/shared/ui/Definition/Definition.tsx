import clsx from "clsx";

import styles from "./Definition.module.scss";
import type { DefinitionProps } from "./Definition.types";

export function Definition({
  label,
  value,
  markerTone = "label",
  className,
}: DefinitionProps) {
  const hasLabel =
    label !== undefined && !(typeof label === "string" && label.length === 0);

  return (
    <div
      className={clsx(
        styles.definition,
        styles[`definition_markerTone_${markerTone}`],
        className,
      )}
    >
      {hasLabel ? (
        <dt className={styles.definition__term}>
          <span className={styles.definition__termContent}>{label}</span>
        </dt>
      ) : null}
      <dd className={styles.definition__description}>
        <span className={styles.definition__descriptionContent}>{value}</span>
      </dd>
    </div>
  );
}
