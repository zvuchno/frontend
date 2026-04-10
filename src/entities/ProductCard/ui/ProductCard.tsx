import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";

import styles from "./productCard.module.scss";
import type { TProductCardProps } from "./types";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const formatTotalPrice = (totalPrice: number) =>
  totalPriceFormatter.format(totalPrice);

export const ProductCard: FC<TProductCardProps> = ({
  image,
  title,
  description,
  price,
  likeButton,
  className,
  ...articleProps
}) => (
  <article className={clsx(styles.productCard, className)} {...articleProps}>
    <div className={styles.media}>
      <Image
        className={styles.image}
        src={image}
        alt={title}
        width={327}
        height={327}
        sizes="327px"
      />
      {likeButton ? (
        <div className={styles.likeButton}>{likeButton}</div>
      ) : null}
    </div>

    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>{formatTotalPrice(Number(price))}</p>
    </div>
  </article>
);
