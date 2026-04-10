import clsx from "clsx";
import { type KeyboardEvent, useState } from "react";
import { ProductCardArtist } from "@/features";
import { ButtonUI } from "@/shared/ui/button/ButtonUI";
import { Definition } from "@/shared/ui/definition";
import { ArrowIcon } from "@/shared/ui/icons/arrowIcon/ArrowIcon";
import styles from "./CardOrderArtist.module.scss";
import type { CardOrderArtistProps } from "./CardOrderArtist.types";

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

const formatTotalPrice = (totalPrice: number) =>
  totalPriceFormatter.format(totalPrice);

const formatOrderDate = (orderDate: Date) =>
  orderDateFormatter.format(orderDate);

export const CardOrderArtist = ({
  orderId,
  statusLabel,
  address,
  deliveryType,
  recipientFIO,
  message,
  totalPrice,
  orderDate,
  products,
  onAccepted,
  onRejected,
}: CardOrderArtistProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `content-${orderId}`;

  const toggleExpanded = () => {
    setIsExpanded((current) => !current);
  };

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
    <article
      className={clsx(styles.card, { [styles.card_expanded]: isExpanded })}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className={styles.header}
        onClick={toggleExpanded}
        onKeyDown={handleHeaderKeyDown}
      >
        <div className={styles.info}>
          <h3 className={styles.orderId}>Заказ №{orderId}</h3>
          <dl>
            <Definition label="Статус" value={statusLabel} />
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
        <div className={styles.contentInner}>
          <dl>
            <Definition label="Адрес" value={address} />
            <Definition label="Способ доставки" value={deliveryType} />
            <Definition label="ФИО получателя" value={recipientFIO} />
          </dl>
          {message && (
            <dl>
              <Definition label="Сообщение" value={message} />
            </dl>
          )}
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCardArtist key={product.id} {...product} />
            ))}
          </div>
          <div className={styles.buttons}>
            <ButtonUI variant={"primary"} size={"small"} onClick={onAccepted}>
              Подтвердить
            </ButtonUI>
            <ButtonUI variant={"secondary"} size={"small"} onClick={onRejected}>
              Отклонить
            </ButtonUI>
          </div>
        </div>
      </div>
    </article>
  );
};
