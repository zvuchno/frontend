import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";

import { ButtonUI } from "@/shared/ui/button";

import styles from "./OrderCardListener.module.scss";
import type { TOrderCardListenerProps } from "./types";

export const OrderCardListener: FC<TOrderCardListenerProps> = ({
  orderNumber,
  itemsCount,
  totalPrice,
  previewImages,
  onDetailsClick,
  className,
  ...articleProps
}) => {
  return (
    <article
      className={clsx(styles.orderCardListener, className)}
      {...articleProps}
    >
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.orderNumber}>Заказ №{orderNumber}</p>
          <p className={styles.orderMeta}>Товаров: {itemsCount}</p>
          <p className={styles.orderMeta}>Сумма: {totalPrice}</p>
        </div>

        <ul className={styles.previewList} aria-label="Превью товаров в заказе">
          {previewImages.map((previewImage, index) => (
            <li key={`${previewImage}-${index}`} className={styles.previewItem}>
              <Image
                className={styles.previewImage}
                src={previewImage}
                alt=""
                aria-hidden="true"
                width={72}
                height={72}
                sizes="(max-width: 375px) 56px, 72px"
              />
            </li>
          ))}
        </ul>
      </div>

      <ButtonUI variant="secondary" size="medium" onClick={onDetailsClick}>
        Подробнее о заказе
      </ButtonUI>
    </article>
  );
};
