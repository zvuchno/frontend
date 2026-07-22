"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

import { RecomendationsList } from "@/widgets/RecomendationsList";

import { useCart, useUpdateCart } from "@/entities/cart";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { ButtonUI, ModalUI } from "@/shared/ui";

import styles from "./CartPage.module.scss";
import { EmptyCart } from "./components/EmptyCart/EmptyCart";
import { ProductsCart } from "./components/ProductsCart/ProductsCart";

export const CartPage = () => {
  const isAuth = useUserStore((state) => state.isUserAuthorized);
  const { data: session } = useSession();

  const token = session?.user.accessToken;

  const { data: cart, isLoading } = useCart({
    enabled: isAuth !== undefined && (isAuth ? !!token : true),
  });

  const { mutate: updateCart } = useUpdateCart();

  const items = cart?.items;

  const changedItems = items && items.filter((item) => item.quantity > item.stock);
  const changedItemsWithStock = changedItems && changedItems.filter((item) => item.stock > 0);

  const [isModalOpen, setIsModalOpen] = useState(
    (changedItemsWithStock && changedItemsWithStock?.length > 0) ?? false
  );

  const handleAcceptChanges = () => {
    changedItemsWithStock?.forEach((item) =>
      updateCart({
        product_variant: item.product_variant,
        quantity: item.stock,
      })
    );
    setIsModalOpen(false);
  };

  if (isAuth === undefined || isLoading) return <div>Загрузка корзины...</div>;

  return (
    <>
      <div className={styles.cart}>
        {!items || items?.length === 0 ? <EmptyCart /> : <ProductsCart cartItems={items} />}
        <RecomendationsList />
      </div>
      {changedItemsWithStock && (
        <ModalUI closeButtonStyle={"x"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <span className={styles.modalTitle}>
              Количество некоторых товаров в корзине изменилось:{" "}
            </span>
            <ul className={styles.modalList}>
              {changedItemsWithStock.map((item) => (
                <li key={item.product_variant} className={styles.modalItem}>
                  <span>
                    {`${item.name} - ${item.stock === 0 ? "нет в наличии" : `доступно ${item.stock} шт.`}`}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.modalButtons}>
              <ButtonUI
                variant={"accentDark"}
                size='small'
                type='button'
                onClick={handleAcceptChanges}
                className={styles.modalButton}
              >
                Пересчитать
              </ButtonUI>
              <ButtonUI
                variant={"secondary"}
                size='small'
                type='button'
                onClick={() => setIsModalOpen(false)}
                className={styles.modalButton}
              >
                Отмена
              </ButtonUI>
            </div>
          </div>
        </ModalUI>
      )}
    </>
  );
};
