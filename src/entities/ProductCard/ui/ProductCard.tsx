import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import styles from "./productCard.module.scss";
import type { TProductCardProps } from "./types";

const totalPriceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const formatTotalPrice = (totalPrice: number) => totalPriceFormatter.format(totalPrice);

export const ProductCard = ({
  image,
  title,
  description,
  price,
  actionButton,
  likeButton,
  className,
  link,
  isRelease = false,
  isPlaying,
  onHandleClick,
  onPlay,
  ...articleProps
}: TProductCardProps) => {
  const mediaAction = actionButton ?? likeButton;

  const handlePlayAlbum = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlay) onPlay();
  };

  return (
    <Link
      href={link ?? "#"}
      onClick={onHandleClick}
      className={styles.productCardWrapper}
      data-list-section-item='product'
    >
      <article className={clsx(styles.productCard, className)} {...articleProps}>
        <div className={styles.media}>
          {image && (
            <Image
              className={styles.image}
              src={image}
              alt={title}
              width={327}
              height={327}
              sizes='327px'
            />
          )}
          {isRelease && (
            <div
              onClick={onPlay ? handlePlayAlbum : undefined}
              className={clsx(
                styles.playButton,
                // albumTracks.length === 0 && styles.playButtonDisabled
              )}
              style={{
                backgroundImage: isPlaying ? "url('/icons/pause.svg')" : "url('/icons/play.svg')",
                cursor:"pointer",
              }}
              aria-label="Воспроизвести альбом"
              title="Воспроизвести альбом"
              role='button'
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onPlay) {
                  handlePlayAlbum(e as any);
                }
              }}
            />
          )}
          {mediaAction ? <div className={styles.actionButton}>{mediaAction}</div> : null}
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
