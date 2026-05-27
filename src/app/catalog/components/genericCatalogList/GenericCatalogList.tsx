import s from "./GenericCatalogList.module.scss";
import { CatalogListProps } from "./GenericCatalogList.types";
import { fetchProductsByCategory } from "@/api/catalog/fetchCategory";
import ProductsList from "../productsList/ProductsList";
import { TRANSLATIONS } from "@/shared/utils/translations";

const GenericCatalogList = async ({ category, filterByGenre, filterBySubcategory, orderingFilter, offset }: CatalogListProps) => {

  try {
    const data = await fetchProductsByCategory(category, {
      limit: '16',
      offset,
      filterByGenre,
      filterBySubcategory,
      orderingFilter
    });

    const nextLink = data.next;
    const products = data.results;

    return (
      <ProductsList products={products} link={nextLink} />
    )
    
  } catch (error) {
    console.log('Ошибка получения карточек категории:', error)
    return (
      <div className={s.message}>{`Не удалось загрузить категорию: ${TRANSLATIONS[category]}`}</div>
    )
  }
};

export default GenericCatalogList;