import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import ProductsList from "../productsList/ProductsList";
import s from "./GenericCatalogList.module.scss";
import { type CatalogListProps } from "./GenericCatalogList.types";
import { TRANSLATIONS } from "@/shared/constants";
import { getArtistsList } from "@/api/catalog/artistsListApi/getArtistsList";

const GenericCatalogList = async ({
  category,
  filterByGenre,
  filterBySubcategory,
  filterByArtist,
  orderingFilter,
  offset,
}: CatalogListProps) => {
  try {

    let products;
    let nextLink;

    if (category === 'artists') {
      const data = await getArtistsList({
        genre: filterByGenre,
        limit: "15",
        offset: offset,
        ordering: orderingFilter,
      });

      products = data.results;
      nextLink = data.next;

    } else {
      const data = await getCatalogList({
        type: category,
        genre: filterByGenre, 
        kind: filterBySubcategory, 
        artist: filterByArtist,
        limit: "16", 
        offset: offset, 
        ordering: orderingFilter
      });

      products = data.results;
      nextLink = data.next;
    }

    return (
      <ProductsList products={products} link={nextLink} />
    )
    
  } catch (error) {
    console.log("Ошибка получения карточек категории:", error);
    return (
      <div
        className={s.message}
      >{`Не удалось загрузить категорию: ${TRANSLATIONS[category]}`}</div>
    );
  }
};

export default GenericCatalogList;
