"use client";

import toast from "react-hot-toast";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { type CartItemRespond, useRemoveCartItem, useUpdateCart } from "@/entities/cart";

import { formatSum } from "@/shared/utils/formatSum";

import { ItemsCounter } from "../ItemsCounter";
import { RemoveFromCart } from "../RemoveFromCart/RemoveFromCart";
import styles from "./CartItem.module.scss";

export const CartItem = ({ item }: { item: CartItemRespond }) => {
  const { mutate: updateCount } = useUpdateCart();
  const { mutate: removeItem } = useRemoveCartItem();

  const hasDiscount = Number(item.base_line_total) > Number(item.discount_line_total);
  const isAvailable = item.stock > 1;

  const router = useRouter();

  const handleUpdateItemCount = (type: "increment" | "decrement") => {
    const currentCount = item.quantity;
    const availableCount = item.stock;

    if (type === "increment") {
      if (currentCount >= availableCount) {
        toast.error("недостаточно товара");
        return;
      }
      const newCount = currentCount + 1;
      return updateCount({
        product_variant: item.product_variant,
        quantity: newCount,
      });
    }
    if (type === "decrement") {
      if (currentCount > 1) {
        return updateCount({
          product_variant: item.product_variant,
          quantity: currentCount - 1,
        });
      }
      return removeItem(item.product_variant);
    }
  };

  const onRemoveItem = () => removeItem(item.product_variant);

  const basePath = "/api/v1/store";
  const targetPath = item.target.url.replace(basePath, "");

  return (
    <article className={clsx(styles.cartItem, !isAvailable && styles.outOfStock)}>
      {item.image && (
        <div
          className={styles.cartItemImage}
          onClick={() => {
            router.push(
              `${targetPath}?kind=${item.target.type}&selected=${item.target.selected_variant_id}`
            );
          }}
        >
          <Image
            src={item.image}
            alt={item?.name ?? ""}
            className={styles.cartItemImageContent}
            width={196}
            height={215}
          />
        </div>
      )}
      <div className={styles.cartItemContent}>
        <div className={styles.cartItemSpecification}>
          <Link
            href={`${targetPath}?kind=${item.target.type}&selected=${item.target.selected_variant_id}`}
            className={styles.cartItemTitle}
          >
            <h3 className={styles.cartItemTitle}>{item.name}</h3>
          </Link>

          <div className={styles.cartItemDetails}>
            <span className={styles.cartItemDescription}>{item.kind}</span>
            <div className={styles.cartItemCounter}>
              <span>Количество:</span>
              <ItemsCounter
                quantity={isAvailable ? item.quantity : 0}
                onIncrement={() => handleUpdateItemCount("increment")}
                onDecrement={() => handleUpdateItemCount("decrement")}
                incrementDisabled={!isAvailable}
                decrementDisabled={!isAvailable}
              />
            </div>
          </div>
          {isAvailable ? (
            <div className={styles.cartItemSum}>
              {hasDiscount && (
                <span className={styles.cartItemDiscountTotal}>
                  {formatSum(item.discount_line_total)} ₽
                </span>
              )}
              <span className={clsx(styles.cartItemTotal, hasDiscount && [styles.oldTotal])}>
                {formatSum(item.base_line_total)} ₽
              </span>
            </div>
          ) : (
            <span className={styles.cartItemTotal}>Нет в наличии</span>
          )}
        </div>
      </div>
      {!isAvailable && <RemoveFromCart removeType={"single"} onDelete={onRemoveItem} />}
    </article>
  );
};
