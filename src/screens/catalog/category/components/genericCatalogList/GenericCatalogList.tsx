import ProductsList from "../productsList/ProductsList";
import s from "./GenericCatalogList.module.scss";
import { type CatalogListProps } from "./GenericCatalogList.types";
import { TRANSLATIONS } from "@/shared/constants";
import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";

const GenericCatalogList = async ({
  category,
  filterByGenre,
  filterBySubcategory,
  filterByArtist,
  orderingFilter,
  offset,
}: CatalogListProps) => {
  const session = await getServerSession(authConfig);
  const token = session?.user.accessToken;
  
  try {

    let products;
    let nextLink;

    if (category === 'artists') {
      const data = await getArtistsListServer({
        genre: filterByGenre,
        limit: "15",
        offset: offset,
        ordering: orderingFilter,
        token,
      });

      products = data?.results ?? [];
      nextLink = data?.next ?? '';

    } else {
      const data = await getCatalogListServer({
        type: category,
        genre: filterByGenre, 
        kind: filterBySubcategory, 
        artist: filterByArtist,
        limit: "16", 
        offset: offset, 
        ordering: orderingFilter,
        token,
      });

      products = data?.results ?? [];
      nextLink = data?.next ?? '';
    }

    return (
      <ProductsList products={products} link={nextLink} />
    )
    
  } catch (error) {
    return (
      <div
        className={s.message}
      >{`Не удалось загрузить категорию: ${TRANSLATIONS[category]}`}</div>
    );
  }
};

export default GenericCatalogList;
