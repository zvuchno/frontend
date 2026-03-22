import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";

import { ButtonUI } from "@/shared/ui/button";

import styles from "./OrderCardListener.module.scss";
import type {
  TOrderCardListenerPreviewItem,
  TOrderCardListenerProps,
} from "./types";

const priceFormatter = new Intl.NumberFormat("ru-RU");

const getItemsLabel = (itemsCount: number) => {
  const remainder100 = itemsCount % 100;
  const remainder10 = itemsCount % 10;

  if (remainder100 >= 11 && remainder100 <= 19) {
    return "товаров";
  }

  if (remainder10 === 1) {
    return "товар";
  }

  if (remainder10 >= 2 && remainder10 <= 4) {
    return "товара";
  }

  return "товаров";
};

const getPreviewItemKey = (previewItem: TOrderCardListenerPreviewItem) => {
  return `${previewItem.src}-${previewItem.title}`;
};

const formatOrderSummary = ({
  orderNumber,
  itemsCount,
  totalPrice,
}: Pick<
  TOrderCardListenerProps,
  "orderNumber" | "itemsCount" | "totalPrice"
>) => {
  const itemsCountLabel = `${itemsCount} ${getItemsLabel(itemsCount)}`;
  const totalPriceLabel = `${priceFormatter.format(totalPrice)} ₽`;

  return `Заказ № ${orderNumber}: ${itemsCountLabel} на сумму ${totalPriceLabel}`;
};

export const OrderCardListener: FC<TOrderCardListenerProps> = ({
  orderNumber,
  itemsCount,
  totalPrice,
  previewItems,
  onDetailsClick,
  className,
  ...articleProps
}) => {
  const normalizedPreviewItems = previewItems.filter(
    (previewItem) => previewItem.src.trim().length > 0,
  );
  const orderSummary = formatOrderSummary({
    orderNumber,
    itemsCount,
    totalPrice,
  });

  return (
    <article
      className={clsx(styles.orderCardListener, className)}
      {...articleProps}
    >
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <p className={styles.orderSummary}>{orderSummary}</p>
        </div>

        <ul
          className={styles.previewList}
          aria-label={
            normalizedPreviewItems.length > 0
              ? "Превью товаров в заказе"
              : "Превью товаров недоступно"
          }
        >
          {normalizedPreviewItems.length > 0 ? (
            normalizedPreviewItems.map((previewItem) => (
              <li
                key={getPreviewItemKey(previewItem)}
                className={styles.previewItem}
              >
                <Image
                  className={styles.previewImage}
                  src={previewItem.src}
                  alt={previewItem.title.trim() || "Товар из заказа"}
                  width={136}
                  height={136}
                  sizes="8.5rem"
                />
              </li>
            ))
          ) : (
            <li className={clsx(styles.previewItem, styles.previewFallback)}>
              Нет превью
            </li>
          )}
        </ul>
      </div>

      <ButtonUI
        variant="secondary"
        size="medium"
        className={styles.detailsButton}
        onClick={onDetailsClick}
      >
        Подробнее о заказе
      </ButtonUI>
    </article>
  );
};
