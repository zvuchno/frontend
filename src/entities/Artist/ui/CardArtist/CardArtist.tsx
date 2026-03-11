import s from './CardArtist.module.scss';
import { CardArtistProps } from "./CardArtist.type";

const CardArtist = ({ image, description, onClick }: CardArtistProps) => {
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

        {onClick && (
          <button 
            className={s.card__button}
            onClick={onClick}
          />
        )}

        {description && (
          <div className={s.card__description}>
            <h4 className={s.card__description__title}>{description}</h4>
          </div>
        )}

      </div>
    </div>
  )
};

export default CardArtist;