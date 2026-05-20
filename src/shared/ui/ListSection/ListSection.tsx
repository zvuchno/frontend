import { Link } from "../Link/Link";
import { Title } from "../Typography/Typography";
import { ListSectionProps } from "./ListSection.type";
import s from "./ListSection.module.scss";

const ListSection = ({ title, link, children }: ListSectionProps) => {
  return (
    <section className={s.section}>
      <div className={s.header}>
        <Title className={s.header__title} Tag="h2">{title}</Title>
        <Link className={s.header__link} href={link}>смотреть все</Link>
      </div>
      <div className={s.content}>
        {children}
      </div>
    </section>
  )
};

export default ListSection;