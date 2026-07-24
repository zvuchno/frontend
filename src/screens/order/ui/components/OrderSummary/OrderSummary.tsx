"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { type FieldValues } from "@/screens/order/model/types";

import { YooKassaPayment } from "@/widgets/PaymentService";
import { usePayment } from "@/widgets/PaymentService";

import { cartQueryKeys } from "@/entities/cart";
import {
  type TOrder,
  type TOrderResponse,
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
  const { mutate: createPaymentKey } = usePayment();

  const router = useRouter();

  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<TOrder>();

  const [confirmationToken, setConfirmationToken] = useState<string | null>(null);

  const isFormValid = hasDeliveryPrice
    ? isValid && totalSum > 0 && deliverySum
    : isValid && totalSum > 0;

  const queryClient = useQueryClient();

  const { data: order } = useQuery<TOrderResponse>({
    queryKey: ["new-order"],
    enabled: false,
  });

  const onSubmit = (orderData: TOrder) => {
    mutate(orderData, {
      onSuccess: (data) => {
        createPaymentKey(data.id, {
          onSuccess: (data) => {
            if (!data) {
              console.error("Не получен токен для оплаты через Ю-Касса");
              return;
            }
            setConfirmationToken(data.confirmation_token);
          },
        });
        void queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
      },
    });
  };

  const handleButtonClick = () => {
    void handleSubmit(onSubmit)();
  };

  const handleNotSucceedPayment = (path: string) => {
    router.push(path);
    toast.error(`Заказ № ${order?.order_number} создан со статусом "Резерв", но не был оплачен`);
  };

  const handleSucceedPayment = (path: string) => {
    router.push(path);
    toast.success(`Заказ № ${order?.order_number} создан и успешно оплачен`);
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

      {confirmationToken && (
        <YooKassaPayment
          confirmationToken={confirmationToken}
          onReturn={handleNotSucceedPayment}
          onSuccess={handleSucceedPayment}
        />
      )}
    </div>
  );
};
