import Hero from "../components/hero/Hero";
import FiltersBlock from "../components/filtersBlock/FiltersBlock";
import { Suspense } from "react";
import GenericCatalogList from "../components/genericCatalogList/GenericCatalogList";
import { getMerchKinds } from "@/api/catalog/merchKindsApi/getMerchKinds";
import s from "./CategoryPage.module.scss";
import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";

interface CategoryPageProps {
  category: 'album' | 'all' | 'merch' | 'artists';
  genre?: string | string[];
  kind?: string | string[];
  artistFilter?: string;
  ordering?: '-created_at' | 'random';
  offset?: string;
  search?: string;
}

export const CategoryPage = async ({
  category,
  genre,
  kind,
  artistFilter,
  ordering,
  offset,
  search,
}: CategoryPageProps) => {

  let merchKinds;

  if (category === "merch") {
    merchKinds = await getMerchKinds();
  }

  return (
    <>
      <AccentContainerWithPlayer>
        <Hero />
        <FiltersBlock
          сategory={category}
          basePath={`/catalog/${category}/`}
          merchList={merchKinds}
        />
      </AccentContainerWithPlayer>
      <Suspense
        fallback={<div className={s.message}>Загрузка карточек...</div>}
      >
        <GenericCatalogList
          category={category}
          filterByGenre={genre}
          filterBySubcategory={kind}
          filterByArtist={artistFilter}
          orderingFilter={ordering}
          offset={offset}
          search={search}
        />
      </Suspense>
    </>
  );
};