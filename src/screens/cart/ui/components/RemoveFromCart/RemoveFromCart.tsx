import clsx from "clsx";

import styles from "./RemoveFromCart.module.scss";

export const RemoveFromCart = ({
  removeType,
  onDelete,
}: {
  removeType: "single" | "bulk";
  onDelete: () => void;
}) => {
  return (
    <button
      type='button'
      className={clsx(
        styles.deleteButton,
        removeType === "single" && styles.single,
        removeType === "bulk" && styles.bulk
      )}
      onClick={onDelete}
    >
      {removeType === "single" && "Удалить из корзины"}
      {removeType === "bulk" && "Удалить все"}
    </button>
  );
};
