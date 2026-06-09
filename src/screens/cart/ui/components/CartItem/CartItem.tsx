import Image from "next/image";
import { TCartItem } from "../../../model/types";
import styles from "./CartItem.module.scss";
import { ItemsCounter } from "./ItemsCounter";

export const CartItem = ({ item }: { item: TCartItem }) => (
  <article className={styles.cartItem}>
    {item.image && (
      <div className={styles.cartItemImage}>
        <Image
          src={item.image}
          alt={item.title}
          className={styles.cartItemImageContent}
          width={196}
          height={215}
        />
      </div>
    )}
    <div className={styles.cartItemContent}>
      <div className={styles.cartItemSpecification}>
        <h3 className={styles.cartItemTitle}>{item.title}</h3>
        <div className={styles.cartItemDetails}>
          <span className={styles.cartItemDescription}>{item.description}</span>
          <div className={styles.cartItemCounter}>
            <span>Количество:</span>
            <ItemsCounter quantity={1} />
          </div>
        </div>
        <span className={styles.cartItemTotal}>{item.price} ₽</span>
      </div>
    </div>
  </article>
);
