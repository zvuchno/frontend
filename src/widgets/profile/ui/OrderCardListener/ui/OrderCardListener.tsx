import { type KeyboardEvent, useState } from "react";

import { getOrderDetail } from "@/api/store";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ArrowIcon, Definition, Loader } from "@/shared/ui";

import type { TOrderCardListenerProps } from "../model/types";
import styles from "./OrderCardListener.module.scss";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const orderDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

const formatOrderDate = (orderDate: Date) => orderDateFormatter.format(orderDate);

export const OrderCardListener = ({
  orderId,
  orderNumber,
  statusLabel,
  totalPrice,
  orderDate,
  images,
}: TOrderCardListenerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `content-${orderId}`;

  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-details", "listener", orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: isExpanded,
    staleTime: 3 * 60 * 1000,
  });

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const allComments = details?.items
    .map((item) => item.comment)
    .filter((comment) => comment && comment.trim() !== "")
    .join(". ");

  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      toggleExpanded();
      return;
    }

    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <article className={clsx(styles.card, { [styles.card_expanded]: isExpanded })}>
      <div
        role='button'
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className={styles.header}
        onClick={toggleExpanded}
        onKeyDown={handleHeaderKeyDown}
      >
        <div className={styles.info}>
          <h3 className={styles.orderId}>Заказ №{orderNumber}</h3>
          <dl>
            <Definition label='Статус' value={statusLabel} />
          </dl>
        </div>
        <div className={styles.summary}>
          <p className={styles.summaryPrice}>{formatTotalPrice(totalPrice)}</p>
          <p className={styles.date}>{formatOrderDate(orderDate)}</p>
          <span className={styles.arrow}>
            <ArrowIcon />
          </span>
        </div>
      </div>
      {!isExpanded && (
        <div className={styles.preview}>
          {images.map((image, index) => (
            <div className={styles.media} key={index}>
              {image && (
                <Image
                  className={styles.image}
                  src={image}
                  alt={image}
                  width={136}
                  height={136}
                  sizes='136px'
                />
              )}
            </div>
          ))}
        </div>
      )}
      <div id={contentId} className={styles.content} aria-hidden={!isExpanded}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Ошибка: {error.message}</p>
        ) : details ? (
          <div className={styles.contentInner}>
            <dl>
              {details.full_address && (
                <Definition
                  className={styles.definition}
                  label='Адрес'
                  value={details.full_address}
                />
              )}
              <Definition
                className={styles.definition}
                label='ФИО получателя'
                value={details.full_name}
              />
              {details.delivery && (
                <Definition
                  className={styles.definition}
                  label='Способ доставки'
                  value={details.delivery}
                />
              )}
              {details.delivery_price && (
                <Definition
                  className={styles.definition}
                  label='Стоимость доставки'
                  value={formatTotalPrice(Number(details.delivery_price))}
                />
              )}
            </dl>
            {allComments && (
              <dl>
                <Definition label='Сообщение' value={allComments} />
              </dl>
            )}
            <div className={styles.products}>
              {details.items.map((product) => {
                const url = product.target.url;
                const match = url.match(/(\d+)\/$/);
                const id = match ? match[1] : null;
                const selected =
                  product.target.selected_variant_id !== null
                    ? product.target.selected_variant_id
                    : undefined;
                return (
                  <div key={product.sku}>
                    <Link
                      href={`/catalog/release/${id}/?kind=${product.target.type}&selected=${selected}`}
                      className={styles.productCard}
                    >
                      <div className={styles.media}>
                        {product.image && (
                          <Image
                            className={styles.image}
                            src={product.image}
                            alt={product.name}
                            width={136}
                            height={136}
                            sizes='136px'
                          />
                        )}
                      </div>
                      <div className={styles.cardContent}>
                        <h4 className={styles.title}>
                          {product.kind} {product.name}
                        </h4>
                        {product.price_at_purchase !== undefined &&
                        product.price_at_purchase !== null ? (
                          <p className={styles.price}>
                            {formatTotalPrice(Number(product.line_total))}
                          </p>
                        ) : null}
                      </div>
                    </Link>
                    {product.quantity === null ? (
                      <p className={styles.quantity}>{`цифровой товар`}</p>
                    ) : (
                      <p className={styles.quantity}>{`количество ${product.quantity}шт`}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
};
