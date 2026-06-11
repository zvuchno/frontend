"use client";

import { ButtonUI } from "@/shared/ui";
import styles from "./OrderSummary.module.scss";
import Link from "next/link";
import clsx from "clsx";

import { useCart } from "@/entities/cart";

import { mockData } from "@/screens/cart/mockData";

export const OrderSummary = () => {
  /** моковые данные mockData, удалить, когда будет реализован механизм добавления товара в корзину и поменять на data из useCart*/

  //const { data } = useCart();

  const data = mockData;
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
