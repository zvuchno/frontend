import { TRANSLATIONS } from "@/shared/constants";
import { Metadata } from "next";
import { CategoryPage } from "@/screens/catalog/category";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: TRANSLATIONS[category] || category,
    description: `Музыкальные товары в категории: "${TRANSLATIONS[category] || category}" магазина "Звучно"`,
  };
};

async function Catalog ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    genre?: string | string[];
    kind?: string | string[];
    ordering?: string;
    offset?: string;
  }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const activeFilterByGenre = resolvedSearchParams.genre;
  const activeFilterBySubcategory = resolvedSearchParams.kind;
  const activeOrderingFilter = resolvedSearchParams.ordering;
  const offset = resolvedSearchParams.offset;

  return (
    <CategoryPage
      category={category} 
      genre={activeFilterByGenre}
      kind={activeFilterBySubcategory}
      ordering={activeOrderingFilter}
      offset={offset}
    />
  )
};

export default Catalog;
