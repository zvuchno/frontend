import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";

import { ButtonUI } from "@/shared/ui/button";

import styles from "./OrderCardListener.module.scss";
import type { TOrderCardListenerProps } from "./types";

const getOrderNumberLabel = (
  orderNumber: TOrderCardListenerProps["orderNumber"],
) => {
  if (typeof orderNumber === "number" && Number.isFinite(orderNumber)) {
    return String(orderNumber);
  }

  if (typeof orderNumber === "string" && orderNumber.trim().length > 0) {
    return orderNumber.trim();
  }

  return null;
};

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

const getItemsCountLabel = (
  itemsCount: TOrderCardListenerProps["itemsCount"],
) => {
  if (
    typeof itemsCount !== "number" ||
    !Number.isFinite(itemsCount) ||
    itemsCount < 0
  ) {
    return null;
  }

  return `${itemsCount} ${getItemsLabel(itemsCount)}`;
};

const getTotalPriceLabel = (
  totalPrice: TOrderCardListenerProps["totalPrice"],
) => {
  if (typeof totalPrice === "number" && Number.isFinite(totalPrice)) {
    return `${new Intl.NumberFormat("ru-RU").format(totalPrice)} ₽`;
  }

  if (typeof totalPrice === "string" && totalPrice.trim().length > 0) {
    return totalPrice.trim();
  }

  return null;
};

const getOrderSummary = ({
  orderNumber,
  itemsCount,
  totalPrice,
}: Pick<
  TOrderCardListenerProps,
  "orderNumber" | "itemsCount" | "totalPrice"
>) => {
  const orderNumberLabel = getOrderNumberLabel(orderNumber);
  const itemsCountLabel = getItemsCountLabel(itemsCount);
  const totalPriceLabel = getTotalPriceLabel(totalPrice);
  const orderLabel = orderNumberLabel ? `Заказ № ${orderNumberLabel}` : "Заказ";

  if (itemsCountLabel && totalPriceLabel) {
    return `${orderLabel}: ${itemsCountLabel} на сумму ${totalPriceLabel}`;
  }

  if (itemsCountLabel) {
    return `${orderLabel}: ${itemsCountLabel}`;
  }

  if (totalPriceLabel) {
    return `${orderLabel} на сумму ${totalPriceLabel}`;
  }

  return `${orderLabel}: детали уточняются`;
};

export const OrderCardListener: FC<TOrderCardListenerProps> = ({
  orderNumber,
  itemsCount,
  totalPrice,
  previewImages,
  onDetailsClick,
  className,
  ...articleProps
}) => {
  const normalizedPreviewImages =
    previewImages?.filter((previewImage) => previewImage.trim().length > 0) ??
    [];
  const orderSummary = getOrderSummary({
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
            normalizedPreviewImages.length > 0
              ? "Превью товаров в заказе"
              : "Превью товаров недоступно"
          }
        >
          {normalizedPreviewImages.length > 0 ? (
            normalizedPreviewImages.map((previewImage, index) => (
              <li
                key={`${previewImage}-${index}`}
                className={styles.previewItem}
              >
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
            ))
          ) : (
            <li className={clsx(styles.previewItem, styles.previewFallback)}>
              Нет превью
            </li>
          )}
        </ul>
      </div>

      <ButtonUI variant="secondary" size="medium" onClick={onDetailsClick}>
        Подробнее о заказе
      </ButtonUI>
    </article>
  );
};
