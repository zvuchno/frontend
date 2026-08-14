"use client";

import { FormProvider, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import { DeliverySelectionProvider, type TOrder } from "@/entities/order";
import { useGetCheckoutData } from "@/entities/order";

import styles from "./OrderPage.module.scss";
import { OrderDetails } from "./components/OrderDetails/OrderDetails";
import { OrderSummary } from "./components/OrderSummary/OrderSummary";
import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";

export const OrderPage = () => {
  const { data } = useGetCheckoutData();

  const userDefault = data?.user_defaults;

  const methods = useForm<TOrder>({
    values: {
      full_name: userDefault?.full_name || "",
      email: userDefault?.email || "",
      phone: userDefault?.phone || "",
      personal_data_consent: undefined,
      city: userDefault?.city,
      street: "",
      house: "",
      apartment: "",
      cdek_city_code: String(userDefault?.city_code),
      tariffs: "",
      delivery_point: "",
      pickup_point: undefined,
      delivery: undefined,
    },
    mode: "onChange",
    shouldUnregister: true,
  });

  return (
    <DeliverySelectionProvider>
      <FormProvider {...methods}>
        <AccentContainerWithPlayer className={styles.order}>
          <h1 className={styles.orderTitle}>Оформление заказа</h1>
          <form className={styles.orderWrapper}>
            <section className={styles.orderDetails}>
              <OrderDetails />
            </section>
            <section className={styles.orderSummary}>
              <OrderSummary />
            </section>
          </form>
        </AccentContainerWithPlayer>
        <DevTool control={methods.control} />
      </FormProvider>
    </DeliverySelectionProvider>
  );
};
