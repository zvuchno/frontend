import { TagUI, Title, Link } from "@/shared/ui";
import s from "./FiltersGroup.module.scss";
import { FiltersGroupProps } from "./FiltersGroup.types";

const FiltersGroup = ({
  title,
  items,
  filterType,
  isSecondary,
  isClearFilters,
  isActiveFilter,
  buildLink,
  clearFilters,
}: FiltersGroupProps) => {
  const handleClickOnFilter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    value: string,
  ) => {
    if (filterType && buildLink && typeof buildLink === "function") {
      e.preventDefault();
      buildLink(filterType, value);
    }
  };

  const handleClearFilters = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (clearFilters && typeof clearFilters === "function") {
      e.preventDefault();
      clearFilters();
    }
  };

  return (
    <div className={s.filterGroup}>
      {title && (
        <Title Tag="h2" className={s.filterGroup__title}>
          {title}
        </Title>
      )}

      <div className={s.filterGroup__tags}>
        {clearFilters && (
          <Link
            href={""}
            onClick={handleClearFilters}
            scroll={false}
            passHref
            prefetch={false}
          >
            <TagUI
              title="Все"
              isActive={isClearFilters ? isClearFilters : false}
              hasIcon={false}
            />
          </Link>
        )}

        {items.map((item) => (
          <Link
            key={item.slug}
            href={buildLink ? "" : `/catalog/${item.slug}`}
            onClick={(e) => handleClickOnFilter(e, item.slug)}
            scroll={false}
            passHref
          >
            <TagUI
              title={item.name}
              isActive={isActiveFilter(item.slug)}
              isSecondary={isSecondary}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FiltersGroup;
