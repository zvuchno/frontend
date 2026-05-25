import { Suspense } from "react";
import CatalogList from "../components/catalogList/CatalogList";
import { TRANSLATIONS } from "@/shared/utils/translations";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import FiltersBlock from "../components/filtersBlock/FiltersBlock";
import Hero from "../components/hero/Hero";

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
  searchParams: Promise<{filter?: string | string[]}>
}) => {

  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const activeFilter = resolvedSearchParams.filter;

  // const products = [
  //   {
  //     id: 1,
  //     image: '/artist-image.png',
  //     title: "ОДИН МАНУЛ",
  //     description: "Винил ОДИН МАНУЛ (LP, 2025)",
  //     price: "1000",
  //   },
  // ]

  return (
    <>
      <AccentContainer>
        <Hero />
        <FiltersBlock initialCategory={category} basePath={`/catalog/${category}/`}/>
      </AccentContainer>
      <Suspense fallback={<div>Загрузка товаров...</div>}>
        <div>Страница категории: {category}</div>
        <CatalogList
          category={category} 
          searchParams={Promise.resolve(resolvedSearchParams)}
          filter={activeFilter}
          //basePath={`/catalog/${category}`} 
        />
      </Suspense>
    </>
  )
}

export default CategoryPage;