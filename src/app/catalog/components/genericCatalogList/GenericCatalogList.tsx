import s from "./GenericCatalogList.module.scss";
import { CatalogListProps } from "./GenericCatalogList.types";
import { fetchProductsByCategory } from "@/api/catalog/fetchCategory";
import ProductsList from "../productsList/ProductsList";

const GenericCatalogList = async ({ category, basePath, filterByGenre, filterBySubcategory, orderingFilter, offset }: CatalogListProps) => {

  try {
    const data = await fetchProductsByCategory(category, {
      limit: '4',
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
    console.log('Ошибка получения продуктов категории:', error)
    return (
      <div>{`Не удалось загрузить продукты в категории: ${category}`}</div>
    )
  }
};

export default GenericCatalogList;