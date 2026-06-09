import Link from "next/link";
import { CartItem } from "../CartItem/CartItem";
import { TCartItem } from "../../../model/types";
import styles from './CartItemsList.module.scss'

export const CartItemsList = ({ cartItems }: { cartItems: TCartItem[] }) => (
  <div className={styles.cartItemsList}>
    <ul className={styles.cartItemsListMenu}>
      {cartItems.map((item) => (
        <li key={item.id} className={styles.cartItemsListItem}>
          <Link
            href={`/catalog/${item.id}`}
            className={styles.cartItemsListItemLink}
          >
            <CartItem item={item} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
