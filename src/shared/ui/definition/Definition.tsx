import clsx from "clsx";

import styles from "./Definition.module.scss";
import type { DefinitionProps } from "./Definition.types";

export function Definition({
  term,
  description,
  className,
  termClassName,
  descriptionClassName,
}: DefinitionProps) {
  return (
    <div className={clsx(styles.definition, className)}>
      <dt className={clsx(styles.definition__term, termClassName)}>{term}</dt>
      <dd
        className={clsx(styles.definition__description, descriptionClassName)}
      >
        {description}
      </dd>
    </div>
  );
}
