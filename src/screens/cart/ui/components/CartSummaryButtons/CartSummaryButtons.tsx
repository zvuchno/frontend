import { CartPromocode } from "../CartPromocode/CartPromocode";
import styles from "./CartSummaryButtons.module.scss";
import { CreateOrderButton } from "./CreateOrderButton";

export const CartSummaryButtons = () => (
  <div className={styles.cartSummaryButtons}>
    <CartPromocode />
    <CreateOrderButton />
  </div>
);
