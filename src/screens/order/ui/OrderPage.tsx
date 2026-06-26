"use client";

import { FormProvider, useForm } from "react-hook-form";

import { AccentContainer } from "@/shared/ui";

import styles from "./OrderPage.module.scss";
import { OrderDetails } from "./components/OrderDetails";
import { OrderSummary } from "./components/OrderSummary";

export const OrderPage = () => {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <AccentContainer className={styles.order}>
        <h1 className={styles.orderTitle}>Оформление заказа</h1>
        <div className={styles.orderWrapper}>
          <section className={styles.orderDetails}>
            <OrderDetails />
          </section>
          <section className={styles.orderSummary}>
            <OrderSummary />
          </section>
        </div>
      </AccentContainer>
    </FormProvider>
  );
};
