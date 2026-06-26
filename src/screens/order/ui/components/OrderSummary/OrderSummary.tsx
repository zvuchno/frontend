"use client";

import clsx from "clsx";

import { useCart } from "@/entities/cart";

import { ButtonUI } from "@/shared/ui";

import styles from "./OrderSummary.module.scss";

export const OrderSummary = () => {
  const { data } = useCart();

  const itemsSum = data?.subtotal;
  const totalSum = data?.total;

  return (
    <div className={styles.summary}>
      <h2 className={styles.summaryTitle}>Ваш заказ:</h2>
      <div className={styles.summaryDetails}>
        <div className={clsx(styles.summarySubtotalSum, styles.mainText)}>
          <span>Товары</span>
          <span>{itemsSum ?? 0} ₽</span>
        </div>
        <div className={clsx(styles.summaryDeliverySum, styles.mainText)}>
          <span>Доставка</span>
          <span>{0} ₽</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Итого:</span>
          <span>{totalSum ? totalSum : 0} ₽</span>
        </div>
      </div>
      <ButtonUI variant={"primary"} className={styles.summaryButton}>
        Оформить заказ
      </ButtonUI>
    </div>
  );
};
