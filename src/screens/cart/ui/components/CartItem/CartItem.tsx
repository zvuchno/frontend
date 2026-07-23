"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { type CartItemRespond, useRemoveCartItem } from "@/entities/cart";

import { formatSum } from "@/shared/utils/formatSum";

import { RemoveFromCart } from "../RemoveFromCart/RemoveFromCart";
import styles from "./CartItem.module.scss";
import { CartItemDetails } from "./CartItemDetails";

export const CartItem = ({ item }: { item: CartItemRespond }) => {
  const { mutate: removeItem } = useRemoveCartItem();

  const hasDiscount = Number(item.base_line_total) > Number(item.discount_line_total);
  const isAvailable = item.stock > 0 || item.stock === null;

  const router = useRouter();

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

          <CartItemDetails item={item} onRemove={removeItem} isAvailable={isAvailable} />
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
            <span className={styles.cartItemTotal} style={{ color: "red" }}>
              Нет в наличии
            </span>
          )}
        </div>
      </div>
      {!isAvailable && <RemoveFromCart removeType={"single"} onDelete={onRemoveItem} />}
    </article>
  );
};
