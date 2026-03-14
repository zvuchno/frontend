import { Title } from '@/shared/ui/Typography/Typography';
import s from './BlogCard.module.scss';
import { BlogCardProps } from './BlogCard.type';

const BlogCard = ({ image, link, description, hasLink = true, onClick }: BlogCardProps) => {
  const CardContent = (
    <>
      {image && (
        <img 
          className={s.card__image} 
          src={image}
          alt="Изображение статьи"
          loading="lazy"
        />
      )}

      {description && (
        <div className={s.card__description}>
          <Title 
            Tag="h6" 
            variant="title" 
            className={s.card__description__title}
          >
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
          <a 
            href={link} 
            className={s.card__link}
            onClick={handleClick}
          >
            {CardContent}
          </a>
        ) : (
          <div 
            className={s.card__content}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onClick && (e.key === 'Enter' || e.key === ' ')) {
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

export default BlogCard;