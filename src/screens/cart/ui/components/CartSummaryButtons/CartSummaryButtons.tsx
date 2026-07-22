import { CartPromocode } from "../CartPromocode/CartPromocode";
import styles from "./CartSummaryButtons.module.scss";
import { CreateOrderButton } from "./CreateOrderButton";

export const CartSummaryButtons = ({ isValid }: { isValid: boolean }) => (
  <div className={styles.cartSummaryButtons}>
    <CartPromocode />
    <CreateOrderButton disabled={!isValid} />
  </div>
);
