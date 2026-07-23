import { type CartItemRespond } from "@/entities/cart";

import styles from "../../CartPage.module.scss";

export const CartChangesList = ({ items }: { items: CartItemRespond[] }) => (
  <ul className={styles.modalList}>
    {items.map((item) => (
      <li key={item.product_variant} className={styles.modalItem}>
        <span>
          {`${item.name} - ${item.stock === 0 ? "нет в наличии" : `доступно ${item.stock} шт.`}`}
        </span>
      </li>
    ))}
  </ul>
);
