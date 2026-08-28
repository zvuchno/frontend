import { TRANSLATIONS } from "@/shared/constants";
import { type Metadata } from "next";
import { CategoryPage } from "@/screens/catalog/category";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: 'album' | 'all' | 'merch' | 'artists' }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: TRANSLATIONS[category] || category,
    description: category === 'artists' 
      ? `Артисты магазина "Звучно"`
      : `Музыкальные товары в категории: "${TRANSLATIONS[category] || category}" магазина "Звучно"`,
  };
};

async function Catalog ({
  params,
  searchParams,
}: {
  params: Promise<{ category: 'album' | 'all' | 'merch' | 'artists' }>;
  searchParams: Promise<{
    genre?: string | string[];
    kind?: string | string[];
    artist?: string;
    ordering?: "-created_at" | "random";
    offset?: string;
    search?: string;
  }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const activeFilterByGenre = resolvedSearchParams.genre;
  const activeFilterBySubcategory = resolvedSearchParams.kind;
  const activeFilterByArtist = resolvedSearchParams.artist;
  const activeOrderingFilter = resolvedSearchParams.ordering;
  const offset = resolvedSearchParams.offset;
  const search = resolvedSearchParams.search;

  return (
    <CategoryPage
      category={category} 
      genre={activeFilterByGenre}
      kind={activeFilterBySubcategory}
      artistFilter={activeFilterByArtist}
      ordering={activeOrderingFilter}
      offset={offset}
      search={search}
    />
  )
};

export default Catalog;
