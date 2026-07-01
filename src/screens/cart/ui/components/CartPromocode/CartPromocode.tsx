import { type ChangeEvent, useState } from "react";

import { useApplyCartPromoCode, useCart, useRemoveCartPromoCode } from "@/entities/cart";

import { ButtonUI } from "@/shared/ui";

import styles from "./CartPromocode.module.scss";

export const CartPromocode = () => {
  const { data } = useCart();
  const promo = data?.code;

  const hasPromoCode = promo !== null;

  const [promocode, setPromocode] = useState(promo);

  const promoValue = promocode?.trim();
  const applyPromo = useApplyCartPromoCode();
  const removePromo = useRemoveCartPromoCode();
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
    <div className={styles.cartSummaryDiscount}>
      <input
        className={styles.cartSummaryDiscountInput}
        placeholder='Ввести промокод'
        value={typeof promocode === "string" ? promocode : ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPromocode(e.target.value)}
        disabled={isPromoLoading || hasPromoCode}
      />
      <ButtonUI
        variant={!hasPromoCode ? "primary" : "secondary"}
        className={styles.cartSummaryDiscountButton}
        onClick={() => handleTogglePromo()}
        disabled={isPromoLoading || !promoValue}
      >
        {hasPromoCode ? "Удалить" : "Применить"}
      </ButtonUI>
    </div>
  );
};
