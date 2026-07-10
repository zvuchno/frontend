"use client";

import { useFormContext } from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { cartQueryKeys } from "@/entities/cart";
import {
  type TOrder,
  useCreateOrder,
  useGetCheckoutData,
  useSelectPickpoint,
} from "@/entities/order";

import { ButtonUI } from "@/shared/ui";
import { formatSum } from "@/shared/utils/formatSum";

import styles from "./OrderSummary.module.scss";

export const OrderSummary = () => {
  const { data } = useGetCheckoutData();

  const itemsSum = data?.subtotal ?? "0";

  const { deliverySelected } = useSelectPickpoint();
  const deliverySum = deliverySelected?.price;
  const totalSum = !deliverySum ? Number(itemsSum) : Number(itemsSum) + Number(deliverySum);

  const { mutate, isPending } = useCreateOrder();

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<TOrder>();

  const isFormValid = isValid && totalSum > 0;

  const queryClient = useQueryClient();

  const onSubmit = (orderData: TOrder) => {
    mutate(orderData, {
      onSuccess: () => {
        router.push(`/order/order-succeed`);
        void queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      },
    });
  };

  const handleButtonClick = () => {
    void handleSubmit(onSubmit)();
  };

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
          <span>{formatSum(String(deliverySum)) + " ₽"}</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Итого:</span>
          <span>{formatSum(totalSum ? totalSum : 0)} ₽</span>
        </div>
      </div>
      <ButtonUI
        type='button'
        variant={"primary"}
        onClick={handleButtonClick}
        className={styles.summaryButton}
        disabled={!isFormValid || isPending}
      >
        Оформить заказ
      </ButtonUI>
    </div>
  );
};
