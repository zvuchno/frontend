"use client";

import Link from "next/link";

import { Title } from "@/shared/ui";

import s from "./BlogCard.module.scss";
import { type BlogCardProps } from "./BlogCard.type";

export const BlogCard = ({ image, link, description, hasLink = true, onClick }: BlogCardProps) => {
  const CardContent = (
    <>
      {image && (
        <img className={s.card__image} src={image} alt='Изображение статьи' loading='lazy' />
      )}

      {description && (
        <div className={s.card__description}>
          <Title Tag='h6' variant='title' className={s.card__description__title}>
            {description}
          </Title>
        </div>
      )}
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className={s.cardWrapper}>
      <div className={s.cardCorner} />
      <div className={s.card}>
        {hasLink && link ? (
          <Link href={link} className={s.card__link} onClick={handleClick} prefetch={false}>
            {CardContent}
          </Link>
        ) : (
          <div
            className={s.card__content}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onClick && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onClick();
              }
            }}
          >
            {CardContent}
          </div>
        )}
      </div>
    </div>
  );
};
