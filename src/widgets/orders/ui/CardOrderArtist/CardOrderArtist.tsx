import { ProductCardArtist } from "@/features";
import { Definition } from "@/shared/ui/definition";
import styles from "./CardOrderArtist.module.scss";
import { CardOrderArtistProps } from "./CardOrderArtist.types";
import { ButtonUI } from "@/shared/ui/button/ButtonUI";
import { useState } from "react";
import { ArrowIcon } from "@/shared/ui/icons/arrowIcon/ArrowIcon";
import clsx from "clsx";

export const CardOrderArtist = (props: CardOrderArtistProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
  return (
    <article
      className={clsx(styles.card, { [styles.card_opened]: !isCollapsed })}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
        aria-controls={`content-${props.orderId}`}
        className={styles.header}
        onClick={() => setIsCollapsed(!isCollapsed)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsCollapsed(!isCollapsed);
          } else if (e.key === " " || e.code === "Space") {
            e.preventDefault();
            setIsCollapsed(!isCollapsed);
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
          <p className={styles.price}>{props.totalPrice} ₽</p>
          <p className={styles.date}>
            {props.orderDate.toLocaleDateString("ru-RU")}
          </p>
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
