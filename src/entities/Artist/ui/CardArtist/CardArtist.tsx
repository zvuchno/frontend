import clsx from "clsx";

import { ButtonLike } from "@/features/ButtonLike";

import { Title } from "@/shared/ui";

import s from "./CardArtist.module.scss";
import { type CardArtistProps } from "./CardArtist.type";

export const CardArtist = ({
  image,
  description,
  hasButton = false,
  isLiked,
  className,
}: CardArtistProps) => {
  return (
    <div className={clsx(s.cardWrapper, className)}>
      <div className={s.cardCorner} />
      <div className={s.card}>
        {image && <img className={s.card__image} src={image} alt='Фото артиста' loading='lazy' />}

        {hasButton && <ButtonLike isLiked={isLiked || false} className={s.card__button} isAuth />}
        {description && (
          <div className={s.card__description}>
            <Title Tag='h4' variant='title' className={s.card__description__title}>
              {description}
            </Title>
          </div>
        )}
      </div>
    </div>
  );
};
