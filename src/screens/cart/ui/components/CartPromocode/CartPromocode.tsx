import { type ChangeEvent, useContext, useState } from "react";

import { PromoCodeContext } from "@/screens/cart/model/context";

import { useApplyCartPromoCode, useRemoveCartPromoCode } from "@/entities/cart";
import { useCartPromoCode } from "@/entities/promoCode";
import { useUserStore } from "@/entities/user";

import { ButtonUI } from "@/shared/ui";

import styles from "./CartPromocode.module.scss";

export const CartPromocode = () => {
  const accessToken = useUserStore((state) => state.user?.accessToken);
  const hasPromoCode = useContext(PromoCodeContext);
  const { promo } = useCartPromoCode();
  const currentPromo = !hasPromoCode ? "" : promo !== null ? promo : "";
  const [promocode, setPromocode] = useState(currentPromo);

  const removePromo = useRemoveCartPromoCode(accessToken);

  const promoValue = promocode?.trim();
  const applyPromo = useApplyCartPromoCode({ promo: promoValue, token: accessToken });
  const isPromoLoading = applyPromo.isPending || removePromo.isPending;

  const handleTogglePromo = () => {
    if (hasPromoCode) {
      console.log(promocode);
      removePromo.mutate(undefined, {
        onSuccess: () => setPromocode(""),
      });
      return;
    }

    if (promoValue) {
      applyPromo.mutate(promoValue);
      console.log(promoValue);
    }
  };
  return (
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
        disabled={isPromoLoading || !promoValue}
      >
        {hasPromoCode ? "Удалить" : "Применить"}
      </ButtonUI>
    </div>
  );
};
