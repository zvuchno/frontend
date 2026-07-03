"use client";

import { FormProvider, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { useSession } from "next-auth/react";

import { type TOrder } from "@/entities/order";

import { AccentContainer } from "@/shared/ui";

import styles from "./OrderPage.module.scss";
import { OrderDetails } from "./components/OrderDetails";
import { OrderSummary } from "./components/OrderSummary";

export const OrderPage = () => {
  const session = useSession();
  const userData = session.data?.user;

  const methods = useForm<TOrder>({
    values: {
      full_name: userData?.userName || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      personal_data_consent: undefined,
      city: "",
      street: "",
      house: "",
      apartment: "",
      delivery: undefined,
    },
  });

  return (
    <FormProvider {...methods}>
      <AccentContainer className={styles.order}>
        <h1 className={styles.orderTitle}>Оформление заказа</h1>
        <form className={styles.orderWrapper}>
          <section className={styles.orderDetails}>
            <OrderDetails />
          </section>
          <section className={styles.orderSummary}>
            <OrderSummary />
          </section>
        </form>
      </AccentContainer>
      <DevTool control={methods.control} />
    </FormProvider>
  );
};
