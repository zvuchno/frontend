import { useState } from "react";

import { useSession } from "next-auth/react";

import { useCart } from "@/entities/cart";

import { ModalUI } from "@/shared/ui";

import styles from "../../CartPage.module.scss";
import { CartChangesButtons } from "./CartChangesButtons";
import { CartChangesList } from "./CartChangesList";

export const ShowCartChanges = () => {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const token = session?.user.accessToken;

  const isEnabled = isAuth ? Boolean(token) : status !== "loading";
  const { data: cart } = useCart({
    enabled: isEnabled,
  });

  const items = cart?.items ?? [];

  const [isModalOpen, setIsModalOpen] = useState((items && items?.length > 0) ?? false);

  const changedItemsWithStock = items.filter(
    (item) => item.quantity > item.stock && item.stock > 0
  );

  if (changedItemsWithStock.length === 0) return;

  return (
    <ModalUI closeButtonStyle={"x"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className={styles.modalContent}>
        <span className={styles.modalTitle}>
          Количество некоторых товаров в корзине изменилось:
        </span>
        <CartChangesList items={changedItemsWithStock} />
        <CartChangesButtons onChancel={setIsModalOpen} />
      </div>
    </ModalUI>
  );
};
