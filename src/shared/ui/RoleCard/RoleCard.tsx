import Image from "next/image";
import Link from "next/link";

import { Text, Title } from "../Typography/Typography";
import s from "./RoleCard.module.scss";
import { type RoleCardProps } from "./RoleCard.type";
import clsx from "clsx";

export const RoleCard = ({ 
  path, 
  title, 
  description, 
  image, 
  cardClassName, 
  imageClassName,
  titleClassName,
}: RoleCardProps) => {
  const imageSrc = typeof image === "string" ? image : image.src;

  return (
    <Link href={path} aria-label={`Перейти к роли: ${title}`} className={s.link}>
      <div className={clsx(s.card, cardClassName)}>
        <div className={clsx(s.card__image, imageClassName)}>
          <Image
            src={imageSrc}
            alt='Роль пользователя'
            className={s.image}
            width={139}
            height={130}
            priority
          />
        </div>
        <div className={s.card__description}>
          <Title Tag='h6' variant='title' className={clsx(s.card__description__title, titleClassName)}>
            {title}
          </Title>
          {description && (
            <Text Tag='p' className={s.card__description__text}>
              {description}
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
};
