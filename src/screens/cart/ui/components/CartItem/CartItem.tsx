"use client";

import Image from "next/image";
import {
  useRemoveCartItem,
  useUpdateCart,
  type CartItemRespond,
} from "@/entities/cart";
import styles from "./CartItem.module.scss";
import { ItemsCounter } from "../ItemsCounter";
import Link from "next/link";

export const CartItem = ({ item }: { item: CartItemRespond }) => {
  const { mutate: updateCount } = useUpdateCart();
  const { mutate: removeCartItem } = useRemoveCartItem();

  const handleUpdateItemCount = (type: "increment" | "decrement") => {
    const currentCount = item.quantity;
    const availableCount = item.stock;
   if (type === "increment") {
    if (currentCount >= availableCount) {
      console.log("недостаточно товара");
      return;
    }
    return updateCount(
      { 
        product_variant: item.product_variant, 
        quantity: currentCount + 1 
      }
    );
  }
    if (type === "decrement") {
      if (currentCount > 1) {
        return updateCount(
          {
            product_variant: item.product_variant,
            quantity: currentCount - 1,
          },
        );
      }
      return removeCartItem(item.product_variant);
    }
  };

  return (
    <article className={styles.cartItem}>
      {item.image && (
        <Link
          href={`/catalog/${item.target?.url}`}
          className={styles.cartItemImage}
        >
          <Image
            src={item.image}
            alt={item?.name ?? ""}
            className={styles.cartItemImageContent}
            width={196}
            height={215}
          />
        </Link>
      )}
      <div className={styles.cartItemContent}>
        <div className={styles.cartItemSpecification}>
          <Link
            href={`/catalog/${item.target?.url}`}
            className={styles.cartItemImage}
          >
            <h3 className={styles.cartItemTitle}>{item.name}</h3>
          </Link>

          <div className={styles.cartItemDetails}>
            <span className={styles.cartItemDescription}>{item.kind}</span>
            <div className={styles.cartItemCounter}>
              <span>Количество:</span>
              <ItemsCounter
                quantity={item.quantity ?? 0}
                onIncrement={() => handleUpdateItemCount("increment")}
                onDecrement={() => handleUpdateItemCount("decrement")}
              />
            </div>
          </div>
          <span className={styles.cartItemTotal}>{item.line_total} ₽</span>
        </div>
      </div>
    </article>
  );
};
