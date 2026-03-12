import { Title } from '@/shared/ui/Typography/Typography';
import s from './CardArtist.module.scss';
import { CardArtistProps } from "./CardArtist.type";

const CardArtist = ({ image, description, hasButton = true }: CardArtistProps) => {
  return (
    <div className={s.cardWrapper}>
      <div className={s.cardCorner} />
      <div className={s.card}>

        {image && (
          <img 
            className={s.card__image} 
            src={image}
            alt="Фото артиста"
          />
        )}

        {hasButton && (
          <button 
            className={s.card__button}
          />
        )}

        {description && (
          <div className={s.card__description}>
            <Title Tag='h4' variant='title' className={s.card__description__title}>{description}</Title>
          </div>
        )}

      </div>
    </div>
  )
};

export default CardArtist;