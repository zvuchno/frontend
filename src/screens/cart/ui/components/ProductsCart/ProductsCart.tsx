import { AccentContainer } from "@/shared/ui";
import { CartItemsList } from "../CartItemsList";
import { CartSummary } from "../CartSummary";
import styles from "../../CartPage.module.scss";
import { CartItemRespond } from "@/entities";

export const ProductsCart = ({
  cartItems,
}: {
  cartItems: CartItemRespond[];
}) => (
  <AccentContainer className={styles.cartMain}>
    <h1 className={styles.cartTitle}>Корзина</h1>
    <section className={styles.cartContent}>
      <CartItemsList cartItems={cartItems} />
      <CartSummary />
    </section>
  </AccentContainer>
);
