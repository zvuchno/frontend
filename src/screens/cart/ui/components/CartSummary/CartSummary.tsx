"use client";

import { type ChangeEvent, useState } from "react";

import clsx from "clsx";
import Link from "next/link";

import { useApplyCartPromoCode, useCart, useRemoveCartPromoCode } from "@/entities/cart";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { ButtonUI } from "@/shared/ui";

import styles from "./CartSummary.module.scss";

export function CartSummary() {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const { data } = useCart(accessToken);

  const [promocode, setPromocode] = useState("");

  const hasPromoCode = Number(data?.discount_promocode) > 0;
  const itemsSum = data?.subtotal;
  const totalSum = data?.total;
  const discountSum = data?.discount_promocode ?? 0;

  const applyPromo = useApplyCartPromoCode(accessToken);
  const removePromo = useRemoveCartPromoCode(accessToken);

  const promoValue = promocode?.trim();
  const isPromoLoading = applyPromo.isPending || removePromo.isPending;

  const handleTogglePromo = () => {
    if (hasPromoCode) {
      removePromo.mutate(undefined, {
        onSuccess: () => setPromocode(""),
      });
      return;
    }

    if (promoValue) {
      applyPromo.mutate(promoValue);
    }
  };

  return (
    <div className={styles.cartSummary}>
      <div className={styles.cartSummaryDetails}>
        <div className={clsx(styles.cartSummarySubtotalSum, styles.mainText)}>
          <span>Товары</span>
          <span>{itemsSum ?? 0} ₽</span>
        </div>
        <div className={clsx(styles.cartSummaryDeliverySum, styles.mainText)}>
          <span>Доставка</span>
          <span>{0} ₽</span>
        </div>
        {hasPromoCode && (
          <div className={clsx(styles.cartSummaryDiscountSum, styles.mainText)}>
            <span>Промокод</span>
            <span>{hasPromoCode ? `-${discountSum}` : 0} ₽</span>
          </div>
        )}
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
            placeholder='Ввести промокод'
            value={promocode}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPromocode(e.target.value)}
            disabled={isPromoLoading || hasPromoCode}
          />
          <ButtonUI
            variant={!hasPromoCode ? "primary" : "secondary"}
            className={styles.cartSummaryDiscountButton}
            onClick={() => handleTogglePromo()}
            disabled={isPromoLoading || (hasPromoCode && !promoValue)}
          >
            {hasPromoCode ? "Удалить" : "Применить"}
          </ButtonUI>
        </div>
        <ButtonUI variant={"primary"} className={styles.cartSummaryButton}>
          <Link href={"/order"} prefetch={false}>
            Перейти к оформлению
          </Link>
        </ButtonUI>
      </div>
    </div>
  );
}
