"use client";

import { ButtonUI } from "@/shared/ui";
import styles from "./CartSummary.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { useCart } from "@/entities/cart";
import {
  useApplyCartPromoCode,
  useRemoveCartPromoCode,
} from "@/entities/cart/model/useCart";
import { ChangeEvent, useState } from "react";
import { mockData } from "@/screens/cart/mockData";

export const CartSummary = () => {
  /** моковые данные mockData, удалить, когда будет реализован механизм добавления товара в корзину и поменять на data из useCard*/

  //const { data } = useCart();

  const [promocode, setPromocode] = useState("");

  const data = mockData;
  const hasPromoCode = Number(data?.discount_promocode) > 0;
  const itemsSum = data?.subtotal;
  const totalSum = data?.total;
  const discountSum = data?.discount_promocode ?? 0;

  const applyPromo = useApplyCartPromoCode();
  const removePromo = useRemoveCartPromoCode();

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
            placeholder="Ввести промокод"
            value={promocode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPromocode(e.target.value)
            }
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
};
