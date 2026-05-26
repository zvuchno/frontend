import { Suspense } from "react";
import { TRANSLATIONS } from "@/shared/utils/translations";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import FiltersBlock from "../components/filtersBlock/FiltersBlock";
import Hero from "../components/hero/Hero";
import GenericCatalogList from "../components/genericCatalogList/GenericCatalogList";

export async function generateMetaData({
  params
}: { params: Promise<{ category: string }> }) {

  const { category } = await params;
  return {
    title: TRANSLATIONS[category] || category,
    description: `Музыкальные товары в категории: "${TRANSLATIONS[category] || category}" магазина "Звучно"`
  }
};

// searchParams тоже получать в пропсах

const CategoryPage = async ({ 
  params,
  searchParams
}: {
  params: Promise<{ category: string }>,
  searchParams: Promise<{genre?: string | string[], kind?: string | string[], ordering?: string, offset?: string}>
}) => {

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
        <FiltersBlock initialCategory={category} basePath={`/catalog/${category}/`}/>
      </AccentContainer>
      <Suspense fallback={<div>Загрузка товаров...</div>}>
        <GenericCatalogList 
          category={category}
          filterByGenre={activeFilterByGenre}
          filterBySubcategory={activeFilterBySubcategory}
          orderingFilter={activeOrderingFilter}
          offset={offset}
          basePath={`/catalog/${category}`}
        />
      </Suspense>
    </>
  )
}

export default CategoryPage;