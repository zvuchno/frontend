import { Suspense } from "react";
import { TRANSLATIONS } from "@/shared/utils/translations";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import FiltersBlock from "../components/filtersBlock/FiltersBlock";
import Hero from "../components/hero/Hero";
import GenericCatalogList from "../components/genericCatalogList/GenericCatalogList";
import { getGenresKinds } from "@/api/genresKinds/genresKindsApi";
import { getMerchKinds } from "@/api/merchKinds/merchKindsApi";
import { Metadata } from "next";
import s from "./page.module.scss";

export async function generateMetadata({
  params
}: { params: Promise<{ category: string }> }): Promise<Metadata> {

  const { category } = await params;
  return {
    title: TRANSLATIONS[category] || category,
    description: `Музыкальные товары в категории: "${TRANSLATIONS[category] || category}" магазина "Звучно"`
  }
};

const CategoryPage = async ({ 
  params,
  searchParams
}: {
  params: Promise<{ category: string }>,
  searchParams: Promise<{genre?: string | string[], kind?: string | string[], ordering?: string, offset?: string}>
}) => {

  const genresKinds = await getGenresKinds();
  const merchKinds = await getMerchKinds();

  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const activeFilterByGenre = resolvedSearchParams.genre;
  const activeFilterBySubcategory = resolvedSearchParams.kind;
  const activeOrderingFilter = resolvedSearchParams.ordering;
  const offset = resolvedSearchParams.offset;

  return (
    <>
      <AccentContainer>
        <Hero />
        <FiltersBlock сategory={category} basePath={`/catalog/${category}/`} genresList={genresKinds} merchList={merchKinds}/>
      </AccentContainer>
      <Suspense fallback={<div className={s.message}>Загрузка карточек...</div>}>
        <GenericCatalogList 
          category={category}
          filterByGenre={activeFilterByGenre}
          filterBySubcategory={activeFilterBySubcategory}
          orderingFilter={activeOrderingFilter}
          offset={offset}
        />
      </Suspense>
    </>
  )
}

export default CategoryPage;