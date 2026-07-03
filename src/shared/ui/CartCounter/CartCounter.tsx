import clsx from "clsx";

import styles from "./HeaderCartWithCounter.module.scss";

type CartCounterProps = {
  count?: number;
  className?: string;
};

export const CartCounter = ({ count, className }: CartCounterProps) => (
  <div className={clsx(styles.cartCounter, className)}>
    <span className={styles.cartCounterNumber}>{count}</span>
  </div>
);
