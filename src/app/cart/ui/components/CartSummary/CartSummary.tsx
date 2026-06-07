'use client'

import { ButtonUI } from "@/shared/ui/button";
import styles from "./CartSummary.module.scss";
import { useState } from "react";
import { useNavigate } from "storybook/internal/router";
import Link from "next/link";
import clsx from "clsx";

export const CartSummary = () => {
  const [isApplied, setIsApplied] = useState(false);
  const sum = null;
  const totalSum = null;

  return (
    <div className={styles.cartSummary}>
      <div className={styles.cartSummaryDetails}>
        <div className={clsx(styles.cartSummarySubtotalSum, styles.mainText)}>
          <span>Товары</span>
          <span>{sum ? sum : 0} ₽</span>
        </div>
        <div className={clsx(styles.cartSummaryDeliverySum, styles.mainText)}>
          <span>Доставка</span>
          <span>{sum ? sum : 0} ₽</span>
        </div>
        <div className={clsx(styles.cartSummaryDiscountSum, styles.mainText)}>
          <span>Промокод</span>
          <span>{sum ? sum : 0} ₽</span>
        </div>
        <div className={styles.deliveryInfo}>
          Стоимость доставки рассчитывается при оформлении заказа
        </div>
        <div className={styles.cartSummaryTotal}>
          <span>Итого:</span>
          <span>{totalSum ? totalSum : 0} ₽</span>
        </div>
      </div>
      <div className={styles.cartSummaryButtons}>
        <div className={styles.cartSummaryDiscount}>
          <input
            className={styles.cartSummaryDiscountInput}
            placeholder="Ввести промокод"
          />
          <ButtonUI
            variant={"primary"}
            className={styles.cartSummaryDiscountButton}
            onClick={() => setIsApplied(!isApplied)}
          >
            {isApplied ? "Применить" : "Удалить"}
          </ButtonUI>
        </div>
        <ButtonUI variant={"primary"} className={styles.cartSummaryButton}>
          <Link href={"/order"}>Перейти к оформлению</Link>
        </ButtonUI>
      </div>
    </div>
  );
};
