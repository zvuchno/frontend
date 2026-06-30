"use client";

import clsx from "clsx";

import { PromoCodeContext } from "@/screens/cart/model/context";

import { useCart } from "@/entities/cart";

import { formatSum } from "@/shared/utils/formatSum";

import { CartSummaryButtons } from "../CartSummaryButtons/CartSummaryButtons";
import styles from "./CartSummary.module.scss";

export function CartSummary() {
  const { data, isLoading } = useCart();

  const hasPromoCode = Number(data?.discount_promocode) > 0;
  const itemsSum = data?.subtotal ?? 0;
  const totalSum = data?.total ?? 0;
  const discountSum = data?.discount_promocode ?? 0;

  if (isLoading && !data) {
    return <div className={styles.cartSummary}>Загрузка...</div>;
  }

  return (
    <PromoCodeContext.Provider value={hasPromoCode}>
      <div className={styles.cartSummary}>
        <div className={styles.cartSummaryDetails}>
          <div className={clsx(styles.cartSummarySubtotalSum, styles.mainText)}>
            <span>Товары</span>
            <span style={{ whiteSpace: "nowrap" }}>{formatSum(itemsSum)} ₽</span>
          </div>
          {hasPromoCode && (
            <div className={clsx(styles.cartSummaryDiscountSum, styles.mainText)}>
              <span>Промокод</span>
              <span style={{ whiteSpace: "nowrap" }}>-{formatSum(discountSum)} ₽</span>
            </div>
          )}
          <div className={styles.deliveryInfo}>
            Стоимость доставки рассчитывается при оформлении заказа
          </div>
          <div className={styles.cartSummaryTotal}>
            <span>Итого:</span>
            <span style={{ whiteSpace: "nowrap" }}>{formatSum(totalSum ? totalSum : 0)} ₽</span>
          </div>
          <CartSummaryButtons />
        </div>
      </div>
    </PromoCodeContext.Provider>
  );
}
