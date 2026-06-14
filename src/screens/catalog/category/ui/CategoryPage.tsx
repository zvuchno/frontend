import { AccentContainer } from "@/shared/ui";
import Hero from "../components/hero/Hero";
import FiltersBlock from "../components/filtersBlock/FiltersBlock";
import { Suspense } from "react";
import GenericCatalogList from "../components/genericCatalogList/GenericCatalogList";
import { getMerchKinds } from "@/api/merchKinds/merchKindsApi";
import s from "./CategoryPage.module.scss";

interface CategoryPageProps {
  category: string;
  genre?: string | string[];
  kind?: string | string[];
  ordering?: string;
  offset?: string;
}

export const CategoryPage = async ({
  category,
  genre,
  kind,
  ordering,
  offset
}: CategoryPageProps) => {

  let merchKinds;

  if (category === "merch") {
    merchKinds = await getMerchKinds();
  }

  return (
    <>
      <AccentContainer>
        <Hero />
        <FiltersBlock
          сategory={category}
          basePath={`/catalog/${category}/`}
          merchList={merchKinds}
        />
      </AccentContainer>
      <Suspense
        fallback={<div className={s.message}>Загрузка карточек...</div>}
      >
        <GenericCatalogList
          category={category}
          filterByGenre={genre}
          filterBySubcategory={kind}
          orderingFilter={ordering}
          offset={offset}
        />
      </Suspense>
    </>
  );
};