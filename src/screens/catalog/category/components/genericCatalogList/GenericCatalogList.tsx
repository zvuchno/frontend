import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";

import { TRANSLATIONS } from "@/shared/constants";

import ProductsList from "../productsList/ProductsList";
import s from "./GenericCatalogList.module.scss";
import { type CatalogListProps } from "./GenericCatalogList.types";

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

    if (category === "artists") {
      const data = await getArtistsListServer({
        genre: filterByGenre,
        limit: "15",
        offset: offset,
        ordering: orderingFilter,
      });

      products = data?.results ?? [];
      nextLink = data?.next ?? "";
    } else {
      const data = await getCatalogListServer({
        type: category,
        genre: filterByGenre,
        kind: filterBySubcategory,
        artist: filterByArtist,
        limit: "16",
        offset: offset,
        ordering: orderingFilter,
      });

      products = data?.results ?? [];
      nextLink = data?.next ?? "";
    }

    return <ProductsList products={products} link={nextLink} />;
  } catch (error) {
    return (
      <div className={s.message}>{`Не удалось загрузить категорию: ${TRANSLATIONS[category]}`}</div>
    );
  }
};

export default GenericCatalogList;
