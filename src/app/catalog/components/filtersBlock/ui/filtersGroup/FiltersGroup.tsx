import { TagUI } from "@/shared/ui/tag/Tag";
import { Title } from "@/shared/ui/Typography/Typography";
import s from "./FiltersGroup.module.scss";
import { FiltersGroupProps } from "./FiltersGroup.types";
import { Link } from "@/shared/ui/Link/Link";

const FiltersGroup = ({ title, items, onClick, isActiveFilter, buildLink, isSecondary }: FiltersGroupProps) => {
  return (
    <div className={s.filterGroup}>
      {title && <Title Tag="h2" className={s.filterGroup__title}>{title}</Title>}
      <div className={s.filterGroup__tags}>
        {items.map(item => (
          <Link key={item.slug} href={buildLink ? buildLink(item.slug) : `/catalog/${item.slug}`}>
            <TagUI key={item.slug} title={item.name}  isActive={isActiveFilter(item.slug)} isSecondary={isSecondary}/>
          </Link>
        ))}
      </div>
    </div>
  )
};

export default FiltersGroup;