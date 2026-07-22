"use client";

import { useFormContext } from "react-hook-form";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { type FieldValues } from "@/screens/order/model/types";

import { cartQueryKeys } from "@/entities/cart";
import {
  type TOrder,
  useCreateOrder,
  useGetCheckoutData,
  useSelectDeliveryTariff,
} from "@/entities/order";

import { ButtonUI } from "@/shared/ui";

import styles from "./OrderSummary.module.scss";
import { SummaryDetails } from "./SummaryDetails/SummaryDetails";

export const OrderSummary = () => {
  const { data } = useGetCheckoutData();

  const itemsSum = data?.subtotal ?? "0";

  const { watch } = useFormContext<FieldValues>();
  const deliveryTafiff = watch("tariffs");
  const hasDeliveryPrice = !!deliveryTafiff;

  const { deliverySelected } = useSelectDeliveryTariff();
  const deliverySum = deliverySelected ? deliverySelected.price : 0;
  const totalSum = !deliverySum ? Number(itemsSum) : Number(itemsSum) + Number(deliverySum);

  const { mutate, isPending } = useCreateOrder();

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<TOrder>();

  const isFormValid = hasDeliveryPrice
    ? isValid && totalSum > 0 && deliverySum
    : isValid && totalSum > 0;

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
      <SummaryDetails subtotal={itemsSum} delivery={String(deliverySum)} total={String(totalSum)} />
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
