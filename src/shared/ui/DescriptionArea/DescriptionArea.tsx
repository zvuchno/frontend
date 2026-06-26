import { type DescriptionAreaProps } from "./types";
import styles from './DescriptionArea.module.scss'
import clsx from "clsx";

export const DescriptionArea = ({
  colorOption = "blue",
  headerwithIcons,
  border,
  children,
  className,
}: DescriptionAreaProps) => (
  <div className={clsx(styles.descriptionArea, border && [styles.border], className)}>
    <div className={clsx(styles.headerArea, styles[colorOption])}>
      {headerwithIcons && (
        <div className={styles.headerAreaIcons}>
          <span className={clsx(styles.headerAreaIcon, styles.subtract)} />
          <span className={clsx(styles.headerAreaIcon, styles.maximize)} />
          <span className={clsx(styles.headerAreaIcon, styles.close)} />
        </div>
      )}
    </div>
    <div className={styles.content}>{children}</div>
  </div>
);
