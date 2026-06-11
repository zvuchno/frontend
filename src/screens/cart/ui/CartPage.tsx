"use client";

import { AccentContainer, ButtonUI, ListSection } from "@/shared/ui";
import styles from "./CartPage.module.scss";
import { CartItemsList } from "./components/CartItemsList";
import { CartSummary } from "./components/CartSummary";
import Link from "next/link";
import { useCart } from "@/entities/cart";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import { mockProducts } from "@/shared/constants";
import { mockData } from "../mockData";

export const CartPage = () => {
  const { data } = useCart();
  const items = data?.items;


  /** моковые данные mockData, удалить, когда будет реализован механизм добавления товара в корзину и поменять на data */

const dataTemp = data ? mockData : null;

const itemsTemp = dataTemp?.items;

  {
    /**заменить на компонент пустой корзины */
  }

  return (
    <div className={styles.cart}>
      <AccentContainer
        className={styles.cartMain}
        style={
          itemsTemp?.length === 0
            ? {
                width: "100%",
                height: "calc(100vh - 500px)",
                padding: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "50px",
              }
            : {}
        }
      >
        {itemsTemp && itemsTemp?.length > 0 ? (
          <>
            <h1 className={styles.cartTitle}>Корзина</h1>
            <section className={styles.cartContent}>
              <CartItemsList cartItems={itemsTemp} />
              <CartSummary />
            </section>
          </>
        ) : (
          <>
            <h1 className={styles.cartTitle}>Корзина пока пуста</h1>
            <ButtonUI
              variant={"primary"}
              size={"standart"}
              className={styles.buttonEmpty}
            >
              <Link href={"/"} prefetch={false} style={{ width: "100%" }}>
                Начать покупки
              </Link>
            </ButtonUI>
          </>
        )}
      </AccentContainer>
      <ListSection
        title="вы смотрели"
        link={`/`}
        className={styles.not_found__main_section}
      >
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            image={product.cover_image}
            description={product.description}
            price={product.price ?? undefined}
            likeButton={<ButtonLike isLiked={product.isLiked} />}
          />
        ))}
      </ListSection>
    </div>
  );
};
