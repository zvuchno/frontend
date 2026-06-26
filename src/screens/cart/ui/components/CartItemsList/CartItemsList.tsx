import type { CartItemRespond } from "@/entities/cart";

import { CartItem } from "../CartItem/CartItem";
import styles from "./CartItemsList.module.scss";

export const CartItemsList = ({ cartItems }: { cartItems: CartItemRespond[] }) => (
  <div className={styles.cartItemsList}>
    <ul className={styles.cartItemsListMenu}>
      {cartItems.map((item) => (
        <li key={item.product_variant} className={styles.cartItemsListItem}>
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  </div>
);
