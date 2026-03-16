import Link from "next/link";
import { Text, Title } from "../Typography/Typography";
import s from './RoleCard.module.scss';
import { RoleCardProps } from "./RoleCard.type";

const RoleCard = ({ path, title, description, image }: RoleCardProps) => {

  const imageSrc = typeof image === 'string' ? image : image.src;

  return (
    <Link href={path} aria-label={`Перейти к роли: ${title}`} className={s.link}>
      <div className={s.card}>
        <div className={s.card__image}>
          <img
            src={imageSrc}
            alt="Роль пользователя"
            className={s.image}
          />
        </div>
        <div className={s.card__description}>
          <Title Tag="h6" variant="title" className={s.card__description__title}>{title}</Title>
          {description && <Text Tag="p" className={s.card__description__text}>{description}</Text>}
        </div>
      </div>
    </Link>
  )
};

export default RoleCard;