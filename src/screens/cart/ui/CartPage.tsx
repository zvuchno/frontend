import { AccentContainer, ButtonUI } from "@/shared/ui";
import styles from "./CartPage.module.scss";
import { CartItemsList } from "./components/CartItemsList";
import { CartSummary } from "./components/CartSummary";
import Link from "next/link";
import { TCartItem } from "../model/types";

export const CartPage = () => {
  const cartItems: TCartItem[] = [
    {
      id: "1",
      title: "Виниловая пластинка",
      description: "винил",
      price: "790",
      image: "/images/mockImage.png",
    },
    {
      id: "2",
      title: "Виниловая пластинка",
      description: "винил",
      price: "790",
      image: "/images/mockImage.png",
    },
  ];

  {
    /**заменить на компонент пустой корзины */
  }

  if (!cartItems.length)
    return (
      <div style={{ width: "400px", padding: "20px" }}>
        <h1 className={styles.cartTitle}>Корзина пока пуста</h1>
        <ButtonUI variant={"primary"} size={"standart"}>
          <Link href={"/"}>Начать покупки</Link>
        </ButtonUI>
      </div>
    );

  return (
    <div className={styles.cart}>
      <AccentContainer className={styles.cartMain}>
        <h1 className={styles.cartTitle}>Корзина</h1>
        <section className={styles.cartContent}>
          <CartItemsList cartItems={cartItems} />
          <CartSummary />
        </section>
      </AccentContainer>
    </div>
  );
};
