import clsx from "clsx";

import styles from "./HeroContainer.module.scss";
import type { HeroContainerProps } from "./HeroContainer.types";

export const HeroContainer = ({
  className,
  children,
  ...divProps
}: HeroContainerProps) => {
  return (
    <div className={clsx(styles.heroContainer, className)} {...divProps}>
      {children}
    </div>
  );
};

export default HeroContainer;
