import { CartIcon } from "../Icons";
import { CartCounter } from "./CartCounter";
import styles from "./HeaderCartWithCounter.module.scss";

export const HeaderCartWithCounter = ({ items }: { items?: number }) => {
  return (
    <div className={styles.headerCartWithCounter}>
      <CartIcon />
      {items !== undefined && items > 0 && <CartCounter count={items} />}
    </div>
  );
};
