import clsx from "clsx";

import { type CartItemRespond, useRemoveCartItem } from "@/entities/cart";

import styles from "../../CartPage.module.scss";
import { CartItemsList } from "../CartItemsList";
import { CartSummary } from "../CartSummary";
import { CartUnavailableItemsList } from "../CartUnavailableItemsList/CartUnavailableItemsList";
import { RemoveFromCart } from "../RemoveFromCart/RemoveFromCart";
import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";

export const ProductsCart = ({ cartItems }: { cartItems: CartItemRespond[] }) => {
  const { mutate: removeItem } = useRemoveCartItem();

  // item.stock === null - цифровые товары в наличии (сток всегда = null), заказ возможен только в 1 экз. по умолчанию
  const availableItems = cartItems.filter((item) => item.stock > 0 || item.stock === null);
  const unAvailableItems = cartItems.filter((item) => item.stock === 0);

  const handleDeleteAll = () => {
    unAvailableItems.forEach((item) => removeItem(item.product_variant));
  };
  return (
    <AccentContainerWithPlayer className={styles.cartMain}>
      <h1 className={styles.cartTitle}>Корзина</h1>
      <section className={styles.cartContent}>
        <div className={styles.cartContentList}>
          {availableItems.length > 0 ? (
            <CartItemsList cartItems={availableItems} />
          ) : (
            <span>Товары в корзине недоступны для заказа</span>
          )}
          {unAvailableItems.length > 0 && (
            <div className={styles.cartUnavailable}>
              <div className={styles.cartUnavailableTitle}>
                <h1 className={clsx(styles.cartTitle, styles.cartSubtitle)}>Нет в наличии</h1>
                <RemoveFromCart removeType={"bulk"} onDelete={handleDeleteAll} />
              </div>
              <CartUnavailableItemsList cartItems={unAvailableItems} />
            </div>
          )}
        </div>
        <CartSummary />
      </section>
    </AccentContainerWithPlayer>
  );
};
