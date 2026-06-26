import clsx from "clsx";
import Image from "next/image";

import styles from "./productCard.module.scss";
import type { TProductCardProps } from "./types";
import Link from "next/link";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const formatTotalPrice = (totalPrice: number) =>
  totalPriceFormatter.format(totalPrice);

export const ProductCard = ({
  image,
  title,
  description,
  price,
  actionButton,
  likeButton,
  className,
  link,
  ...articleProps
}: TProductCardProps) => {
  const mediaAction = actionButton ?? likeButton;

  return (
    <Link href={link ?? '#'}>
      <article className={clsx(styles.productCard, className)} {...articleProps}>
        <div className={styles.media}>
          {image && (
          <Image
              className={styles.image}
              src={image}
              alt={title}
              width={327}
              height={327}
              sizes="327px"
            />
          )}
        {mediaAction ? (
            <div className={styles.actionButton}>{mediaAction}</div>
          ) : null}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          {price !== undefined && price !== null ? (
            <p className={styles.price}>{formatTotalPrice(Number(price))}</p>
          ) : null}
        </div>
      </article>
    </Link>
  );
};
