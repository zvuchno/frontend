import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import type { TArtistsListResponse } from "@/api/catalog/artistsListApi/types";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";
import type { TCatalogListResponse } from "@/api/catalog/catalogListApi/types";

import { type ProductsListProps } from "./ProductsList.types";
import ProductsListClient from "./ProductsListClient";

export default async function ProductsList(props: ProductsListProps) {
  const { category, filterByGenre, filterBySubcategory, filterByArtist, orderingFilter, offset, search } = props;

  const initialPage: TArtistsListResponse | TCatalogListResponse | null =
    category === "artists"
      ? await getArtistsListServer({
          genre: filterByGenre,
          limit: "15",
          offset,
          ordering: orderingFilter,
          search,
        })
      : await getCatalogListServer({
          type: category,
          genre: filterByGenre,
          kind: filterBySubcategory,
          artist: filterByArtist,
          limit: "16",
          offset,
          ordering: orderingFilter,
          search,
        });

  return (
    <ProductsListClient
      {...props}
      initialPage={initialPage}
    />
  );
}
