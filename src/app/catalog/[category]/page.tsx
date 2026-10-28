import { type Metadata } from "next";

import { CategoryPage } from "@/screens/catalog/category";

import { TRANSLATIONS } from "@/shared/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: "release" | "all" | "merch" | "artists" }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${TRANSLATIONS[category] || category} | ЗВУЧНО`,
    description:
      category === "artists"
        ? "Слушайте музыку и выбирайте релизы и мерч артистов на маркетплейсе «Звучно»."
        : `Выбирайте ${TRANSLATIONS[category] || category.toLowerCase()} от независимых артистов на маркетплейсе «Звучно».`,
    alternates: {
      canonical: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}catalog/${category}`,
    },
    openGraph: {
      title: `${TRANSLATIONS[category] || category} | ЗВУЧНО`,
      description:
        category === "artists"
          ? "Слушайте музыку и выбирайте релизы и мерч артистов на маркетплейсе «Звучно»."
          : `Выбирайте ${TRANSLATIONS[category] || category.toLowerCase()} от независимых артистов на маркетплейсе «Звучно».`,
      type: "article",
      url: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}catalog/${category}`,
    },
  };
}

async function Catalog({
  params,
  searchParams,
}: {
  params: Promise<{ category: "release" | "all" | "merch" | "artists" }>;
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
  );
}

export default Catalog;
