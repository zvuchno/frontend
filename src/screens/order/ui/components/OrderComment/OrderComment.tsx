import { CustomInput } from "@/shared/ui";

import styles from "./OrderComment.module.scss";

export const OrderComment = () => {
  return (
    <CustomInput
      id='comment'
      label={"Комментарий к заказу"}
      rows={5}
      multiline
      className={styles.orderComment}
      maxLength={300}
      placeholder="Заполните это поле, если хотите что-то уточнить по заказу (макс. 300 знаков)"
    />
  );
};
