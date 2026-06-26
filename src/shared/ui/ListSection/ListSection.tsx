import { Link } from "../Link/Link";
import { Title } from "../Typography/Typography";
import { type ListSectionProps } from "./ListSection.type";
import s from "./ListSection.module.scss";
import clsx from "clsx";

export const ListSection = ({
  title,
  link,
  children,
  hasMore = true,
  gap = '20px',
  className,
}: ListSectionProps) => {
  return (
    <section className={clsx(s.section, className)}>
      <div className={s.header}>
        <Title className={s.header__title} Tag="h2">
          {title}
        </Title>
        {hasMore && (
          <Link className={s.header__link} href={link} prefetch={false}>
            смотреть все
          </Link>
        )}
      </div>
      <div className={s.content} style={{ columnGap: gap }}>{children}</div>
    </section>
  );
};
