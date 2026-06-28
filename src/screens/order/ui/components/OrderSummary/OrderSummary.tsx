"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";

import { useCart } from "@/entities/cart";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { ButtonUI } from "@/shared/ui";

import styles from "./OrderSummary.module.scss";

export const OrderSummary = () => {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const { data } = useCart(accessToken);

  const itemsSum = data?.subtotal;
  const totalSum = data?.total;

  // для тестов - потом убрать роутер
  const router = useRouter();
  //

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
