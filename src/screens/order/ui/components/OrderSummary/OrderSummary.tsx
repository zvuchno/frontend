"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";

import { useCart } from "@/entities/cart";

import { ButtonUI } from "@/shared/ui";
import { formatSum } from "@/shared/utils/formatSum";

import styles from "./OrderSummary.module.scss";

export const OrderSummary = () => {
  const { data } = useCart();

  const itemsSum = data?.total ?? "0";
  const deliverySum = "0";
  const totalSum = Number(itemsSum) + Number(deliverySum);

  // для тестов - потом убрать роутер
  const router = useRouter();
  //

  return (
    <div className={styles.summary}>
      <h2 className={styles.summaryTitle}>Ваш заказ:</h2>
      <div className={styles.summaryDetails}>
        <div className={clsx(styles.summarySubtotalSum, styles.mainText)}>
          <span>Товары</span>
          <span>{formatSum(itemsSum) ?? 0} ₽</span>
        </div>
        <div className={clsx(styles.summaryDeliverySum, styles.mainText)}>
          <span>Доставка</span>
          <span>{formatSum(deliverySum) + " ₽"}</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Итого:</span>
          <span>{formatSum(totalSum ? totalSum : 0)} ₽</span>
        </div>
      </div>
      <ButtonUI
        variant={"primary"}
        className={styles.summaryButton}
        onClick={() => router.push(`/order/order-succeed`)}
      >
        Оформить заказ
      </ButtonUI>
    </div>
  );
};
