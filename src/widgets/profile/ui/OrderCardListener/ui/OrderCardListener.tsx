import clsx from "clsx";
import Image from "next/image";

import { ArrowIcon, Definition, Loader } from "@/shared/ui";

import styles from "./OrderCardListener.module.scss";
import type { TOrderCardListenerProps } from "../model/types";
import { type KeyboardEvent, useState } from "react";
import { getOrderDetail, type StoreOrderDetail } from "@/api/store";
import Link from "next/link";
import { useSession } from "next-auth/react";

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

export const OrderCardListener = ({
  orderId,
  orderNumber,
  statusLabel,
  totalPrice,
  orderDate,
  images,
}: TOrderCardListenerProps) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const [isExpanded, setIsExpanded] = useState(false);
  const [details, setDetails] = useState<StoreOrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentId = `content-${orderId}`;

  const toggleExpanded = async () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    setIsExpanded(true);
    setLoading(true);
    setError(null);

    if (!details) {
      try {
        const data = await getOrderDetail(orderId, token);
        setDetails(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    }
  };

  const allComments = details?.items
    .map((item) => item.comment)
    .filter((comment) => comment && comment.trim() !== '')
    .join('. ');

  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      void toggleExpanded();
      return;
    }

    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
      void toggleExpanded();
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
        onClick={() => void toggleExpanded()}
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
        {loading ? (
          <Loader />
        ) : error ? (
          <p>Ошибка: {error}</p>
        ) : details ? (
          <div className={styles.contentInner}>
            <dl>
              <Definition className={styles.definition} label='Адрес' value={details?.full_address} />
              <Definition className={styles.definition} label='Способ доставки' value={details.delivery} />
              <Definition className={styles.definition} label='ФИО получателя' value={details.full_name} />
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
                    <div className={styles.content}>
                      <h4 className={styles.title}>`${product.kind} ${product.name}`</h4>
                      {product.price_at_purchase !== undefined && product.price_at_purchase !== null ? (
                        <p className={styles.price}>{formatTotalPrice(Number(product.price_at_purchase))}</p>
                      ) : null}
                    </div>
                  </Link>
                  <p className={styles.quantity}>{`количество ${product.quantity}шт`}</p>
                </div>)
              })}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
};
