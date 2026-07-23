"use client";

import { useSession } from "next-auth/react";

import { RecomendationsList } from "@/widgets/RecomendationsList";

import { useCart } from "@/entities/cart";

import styles from "./CartPage.module.scss";
import { EmptyCart } from "./components/EmptyCart/EmptyCart";
import { ProductsCart } from "./components/ProductsCart/ProductsCart";
import { ShowCartChanges } from "./components/ShowCartChanges/ShowCartChanges";

export const CartPage = () => {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const token = session?.user.accessToken;

  const { data: cart, isLoading } = useCart({
    enabled: isAuth !== undefined && (isAuth ? !!token : true),
  });

  const items = cart?.items;

  if (isAuth === undefined || isLoading) return <div>Загрузка корзины...</div>;

  return (
    <>
      <div className={styles.cart}>
        {!items || items?.length === 0 ? <EmptyCart /> : <ProductsCart cartItems={items} />}
        <RecomendationsList />
      </div>
      <ShowCartChanges />
    </>
  );
};
