import toast from "react-hot-toast";

import { type CartItemRespond, useUpdateCart } from "@/entities/cart";

import { ItemsCounter } from "../ItemsCounter";
import styles from "./CartItem.module.scss";

export const CartItemDetails = ({
  item,
  onRemove,
  isAvailable,
}: {
  item: CartItemRespond;
  isAvailable: boolean;
  onRemove: (id: number) => void;
}) => {
  const { mutate: updateCount } = useUpdateCart();
  const digitalItem = item.stock === null;

  const isInappropriate = item.stock > 0 && item.quantity > item.stock;

  const handleUpdateItemCount = (type: "increment" | "decrement") => {
    const currentCount = item.quantity;
    const availableCount = item.stock;

    if (type === "increment") {
      if (currentCount >= availableCount) {
        toast.error("недостаточно товара");
        return;
      }
      const newCount = currentCount + 1;
      return updateCount(
        {
          product_variant: item.product_variant,
          quantity: newCount,
        },
        { onSuccess: () => toast.success("Количество товара в корзине изменено") }
      );
    }
    if (type === "decrement") {
      if (currentCount > 1) {
        return updateCount({
          product_variant: item.product_variant,
          quantity: currentCount - 1,
        });
      }
      return onRemove(item.product_variant);
    }
  };
  return (
    <div className={styles.cartItemDetails}>
      <span className={styles.cartItemDescription}>{item.kind}</span>
      {isAvailable && (
        <>
          {" "}
          <div className={styles.cartItemCounter}>
            <span>Количество:</span>
            <ItemsCounter
              quantity={isAvailable ? item.quantity : 0}
              onIncrement={() => handleUpdateItemCount("increment")}
              onDecrement={() => handleUpdateItemCount("decrement")}
              incrementDisabled={digitalItem ? true : item.quantity < item.stock ? false : true}
              decrementDisabled={!isAvailable}
            />
          </div>
          {digitalItem && <span>цифровой товар</span>}
        </>
      )}
      {isInappropriate && (
        <span
          className={styles.cartItemStockMessage}
        >{`Недостаточно товара на складе. Доступно ${item.stock} шт.`}</span>
      )}
    </div>
  );
};
