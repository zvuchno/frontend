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
        ? "Слушайте музыку и покупайте релизы и мерч любимых артистов на ЗВУЧНО"
        : category === "all"
          ? `Купить музыку, винил, CD, авторский мерч и поддержать творчество любимых артистов на ЗВУЧНО`
          : category === "release"
            ? `Найти музыку по душе, купить релиз, купить музыкальный сборник на ЗВУЧНО`
            : `Купить винил, CD, одежду и аксессуары от артистов на ЗВУЧНО`,
    alternates: {
      canonical: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}catalog/${category}`,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: `${TRANSLATIONS[category] || category} | ЗВУЧНО`,
      description:
        category === "artists"
          ? "Слушайте музыку и покупайте релизы и мерч любимых артистов на ЗВУЧНО"
          : category === "all"
            ? `Каталог: Слушать авторскую музыку, купить релиз, музыкатьный альбом, винил, CD, поддержать любимых артистов`
            : category === "release"
              ? `Найти музыку по душе, купить релиз, купить музыкальный сборник напрямую от артиста. Больше музыки и товаров на zvuchno.space`
              : `Купить винил, CD, одежду и аксессуары от артистов. Больше музыки и товаров на zvuchno.space`,
      type: "article",
      url: `${new URL(process.env.FRONTEND_ORIGIN || "http://localhost:3000")}catalog/${category}`,
      siteName: "ЗВУЧНО",
      images: [
        {
          url: "/images/main-banner.png",
          width: 1200,
          height: 630,
          alt: "Купить музыку, винил, CD, авторский мерч и поддержать творчество любимых артистов на ЗВУЧНО",
        },
      ],
      locale: "ru_RU",
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
