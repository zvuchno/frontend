"use client";

import { RecomendationsList } from "@/widgets/RecomendationsList";

import { useCart } from "@/entities/cart";
import { useUserStore } from "@/entities/user/store/useUserStore";

import styles from "./CartPage.module.scss";
import { EmptyCart } from "./components/EmptyCart/EmptyCart";
import { ProductsCart } from "./components/ProductsCart/ProductsCart";

export const CartPage = () => {
  const isAuth = useUserStore((state) => state.isUserAuthorized);
  const accessToken = useUserStore((state) => state.user?.accessToken);

  const {
    data: cart,
    isLoading,
    isFetching,
    isPending,
  } = useCart(accessToken, { enabled: isAuth !== undefined && (isAuth ? !!accessToken : true) });
  const items = cart?.items;

  if (isAuth === undefined || isLoading || isFetching || isPending)
    return <div>Загрузка корзины...</div>;

  return (
    <div className={styles.cart}>
      {!items || items?.length === 0 ? <EmptyCart /> : <ProductsCart cartItems={items} />}
      <RecomendationsList />
    </div>
  );
};
