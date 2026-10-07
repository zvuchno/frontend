import { TagUI, Title } from "@/shared/ui";
import s from "./FiltersGroup.module.scss";
import { type FiltersGroupProps } from "./FiltersGroup.types";

const FiltersGroup = ({
  title,
  items,
  filterType,
  isSecondary,
  isClearFilters,
  isActiveFilter,
  buildLink,
  clearFilters,
  isCategory,
}: FiltersGroupProps) => {
  const handleClickOnFilter = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string,
  ) => {
    if (filterType && buildLink && typeof buildLink === "function") {
      e.preventDefault();
      buildLink(filterType, value);
    }
  };

  const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
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
          <button
            onClick={handleClearFilters}
            type="button"
            className={s.filterGroup__button}
          >
            <TagUI
              title="Все"
              isActive={isClearFilters ? isClearFilters : false}
              hasIcon={false}
            />
          </button>
        )}

        {items.map((item) => (
          <button
            key={item.slug}
            onClick={(e) => handleClickOnFilter(e, item.slug)}
            type="button"
            className={s.filterGroup__button}
          >
            <TagUI
              title={item.name}
              isActive={isActiveFilter(item.slug)}
              isSecondary={isSecondary}
              hasIcon={!isCategory}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltersGroup;
