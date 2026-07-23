import { useSession } from "next-auth/react";

import { useCart, useUpdateCart } from "@/entities/cart";

import { ButtonUI } from "@/shared/ui";

import styles from "../../CartPage.module.scss";

export const CartChangesButtons = ({ onChancel }: { onChancel: (isOpen: boolean) => void }) => {
  const { mutate: updateCart } = useUpdateCart();
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";

  const token = session?.user.accessToken;
  const { data: cart } = useCart({
    enabled: isAuth !== undefined && (isAuth ? !!token : true),
  });
  const items = cart?.items;
  const changedItems = items && items.filter((item) => item.quantity > item.stock);
  const changedItemsWithStock = changedItems && changedItems.filter((item) => item.stock > 0);

  const handleAcceptChanges = () => {
    changedItemsWithStock?.forEach((item) =>
      updateCart({
        product_variant: item.product_variant,
        quantity: item.stock,
      })
    );
    onChancel(false);
  };
  return (
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
        onClick={() => onChancel(false)}
        className={styles.modalButton}
      >
        Отмена
      </ButtonUI>
    </div>
  );
};
