import { Link } from "../Link/Link";
import { Title } from "../Typography/Typography";
import { ListSectionProps } from "./ListSection.type";
import s from "./ListSection.module.scss";
import clsx from "clsx";

export const ListSection = ({
  title,
  link,
  children,
  className,
}: ListSectionProps) => {
  return (
    <section className={clsx(s.section, className)}>
      <div className={s.header}>
        <Title className={s.header__title} Tag="h2">
          {title}
        </Title>
        <Link className={s.header__link} href={link} prefetch={false}>
          смотреть все
        </Link>
      </div>
      <div className={s.content}>{children}</div>
    </section>
  );
};
