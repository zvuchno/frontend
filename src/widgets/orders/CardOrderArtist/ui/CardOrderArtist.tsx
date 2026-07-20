"use client";

import { type KeyboardEvent, useState } from "react";

import clsx from "clsx";

import { Definition, Loader } from "@/shared/ui";
import { ArrowIcon } from "@/shared/ui/Icons";

import type { CardOrderArtistProps } from "../model/CardOrderArtist.types";
import styles from "./CardOrderArtist.module.scss";
import { getArtistOrderDetails } from "@/api/artist/ordersApi/getArtistOrders";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const orderDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

const formatOrderDate = (orderDate: Date) => orderDateFormatter.format(orderDate);

export const CardOrderArtist = ({
  orderId,
  orderNumber,
  statusLabel,
  totalPrice,
  orderDate,
  // onAccepted,
  // onRejected,
}: CardOrderArtistProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `content-${orderId}`;

  const { data: details, isLoading, error } = useQuery({
    queryKey: ['order-details', 'listener', orderId],
    queryFn: () => getArtistOrderDetails(orderId, token),
    enabled: isExpanded,
    staleTime: 3 * 60 * 1000,
  });

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const allComments = details?.items
    .map((item) => item.comment)
    .filter((comment) => comment && comment.trim() !== '')
    .join('. ');

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
          <p className={styles.price}>{formatTotalPrice(totalPrice)}</p>
          <p className={styles.date}>{formatOrderDate(orderDate)}</p>
          <span className={styles.arrow}>
            <ArrowIcon />
          </span>
        </div>
      </div>
      <div id={contentId} className={styles.content} aria-hidden={!isExpanded}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Ошибка: {error.message}</p>
        ) : details ? (
          <div className={styles.contentInner}>
            <dl>
              <Definition className={styles.definition} label='Адрес' value={details.full_address} />
              <Definition className={styles.definition} label='Способ доставки' value={details.delivery} />
              <Definition className={styles.definition} label='ФИО получателя' value={details.full_name} />
              <Definition className={styles.definition} label='Номер отправления' value={details.cdek_number} />
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
                      <dl>
                        <Definition className={styles.definition} label={product.kind} value={product.name} />
                        {product.property_name && product.property_value && (
                          <Definition className={styles.definition} label={product.property_name} value={product.property_value} />
                        )}
                        {/* <Definition className={styles.definition} label='Тип' value={product.kind} /> */}
                        <Definition className={styles.definition} label='Артикул' value={product.sku} />
                        <Definition className={styles.definition} label='Кол-во' value={product.quantity} />
                      </dl>
                    </div>
                  </Link>
                </div>)
              })}
            </div>
            {/* <div className={styles.buttons}>
              <ButtonUI variant={"primary"} size={"small"} onClick={onAccepted}>
                Подтвердить
              </ButtonUI>
              <ButtonUI variant={"secondary"} size={"small"} onClick={onRejected}>
                Отклонить
              </ButtonUI>
            </div> */}
          </div>
        ) : null}
      </div>
    </article>
  );
};
