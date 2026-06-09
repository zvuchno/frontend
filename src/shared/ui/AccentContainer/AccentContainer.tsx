import clsx from "clsx";

import styles from "./AccentContainer.module.scss";
import type { AccentContainerProps } from "./AccentContainer.types";

export const AccentContainer = ({
  className,
  children,
  ...divProps
}: AccentContainerProps) => {
  return (
    <div className={clsx(styles.accentContainer, className)} {...divProps}>
      {children}
    </div>
  );
};

export default AccentContainer;
