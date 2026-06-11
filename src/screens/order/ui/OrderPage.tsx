import { AccentContainer } from "@/shared/ui";
import styles from "./OrderPage.module.scss";
import { OrderSummary } from "./components/OrderSummary";

export const OrderPage = () => {
  return (
    <AccentContainer className={styles.order}>
      <h1 className={styles.orderTitle}>Оформление заказа</h1>
      <div className={styles.orderWrapper}>
        <section className={styles.orderDetails}></section>
        <section className={styles.orderSummary}>
          <OrderSummary />
        </section>
      </div>
    </AccentContainer>
  );
};
