import { ProductCardArtist } from "@/features";
import { Definition } from "@/shared/ui/definition";
import styles from "./CardOrderArtist.module.scss";
import type { CardOrderArtistProps } from "./CardOrderArtist.types";
import { ButtonUI } from "@/shared/ui/button/ButtonUI";
import { useState } from "react";
import { ArrowIcon } from "@/shared/ui/icons/arrowIcon/ArrowIcon";
import clsx from "clsx";

export const CardOrderArtist = (props: CardOrderArtistProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  let status = "";
  switch (props.status) {
    case "delivered":
      status = "Доставлено";
      break;
    case "paid":
      status = "Оплачен";
      break;
    default:
      status = props.status;
      break;
  }

  const formattedTotalPrice = Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(props.totalPrice);

  const formattedOrderDate = Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(props.orderDate);

  return (
    <article
      className={clsx(styles.card, { [styles.card_expanded]: isExpanded })}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`content-${props.orderId}`}
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsExpanded(!isExpanded);
          } else if (e.key === " " || e.code === "Space") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className={styles.info}>
          <h3 className={styles.orderId}>Заказ №{props.orderId}</h3>
          <dl>
            <Definition label="Статус" value={status} />
          </dl>
        </div>
        <div className={styles.summary}>
          <p className={styles.price}>{formattedTotalPrice}</p>
          <p className={styles.date}>{formattedOrderDate}</p>
          <span className={styles.arrow}>
            <ArrowIcon />
          </span>
        </div>
      </div>
      <div id={`content-${props.orderId}`} className={styles.content}>
        <dl>
          <Definition label="Адрес" value={props.address} />
          <Definition label="Способ доставки" value={props.deliveryType} />
          <Definition label="Фио получателя" value={props.recipientFIO} />
        </dl>
        {props.message && (
          <dl>
            <Definition label="Сообщение" value={props.message} />
          </dl>
        )}
        <div className={styles.products}>
          {props.products.map((product) => (
            <ProductCardArtist key={product.id} {...product} />
          ))}
        </div>
        <div className={styles.buttons}>
          <ButtonUI
            variant={"primary"}
            size={"small"}
            onClick={props.onAccepted}
          >
            Подтвердить
          </ButtonUI>
          <ButtonUI
            variant={"secondary"}
            size={"small"}
            onClick={props.onRejected}
          >
            Отклонить
          </ButtonUI>
        </div>
      </div>
    </article>
  );
};
