import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";
import { type Metadata } from "next";

import { HomePage } from "@/screens/home";

//export const dynamic = "force-dynamic";
export const revalidate = 0;

async function measure<T>(name: string, request: () => Promise<T>): Promise<T> {
  const started = performance.now();

  try {
    const result = await request();
    console.info(`[home] ${name}: ${(performance.now() - started).toFixed(0)} ms`);
    return result;
  } catch (error) {
    console.error(
      `[home] ${name} failed after ${(performance.now() - started).toFixed(0)} ms`,
      error
    );
    throw error;
  }
}

export const metadata: Metadata = {
  title: "ЗВУЧНО - маркетплейс независимой музыки, мерча и винила",
  description:
    "Маркетплейс цифровой музыки для СНГ артистов. Покупайте цифровые релизы, эксклюзивный мерч, виниловые пластинки и CD напрямую у любимых авторов.",
  keywords: [
    "звучно платформа",
    "маркетплейс локальной музыки",
    "музыкальный маркетплейс",
    "независимые артисты",
    "купить винил",
    "музыкальный мерч",
    "поддержка музыкантов",
    "инди",
    "музыка рф",
    "купить цифровой релиз",
    "звучно маркетплейс",
    "локальная сцена",
    "zvuchno",
    "zvuchno marketplace",
    "zvuchno platform",
    "музыкальный merch",
    "купить cd",
    "продать свою музыку",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "https://dev.zvuchno.space",
  },
  openGraph: {
    title: "Цифровые релизы и эксклюзивный мерч от любимых авторов",
    description:
      "Первый в России маркетплейс, предназначенный для продажи музыкального контента и сопутствующих товаров напрямую от авторов",
    siteName: "ЗВУЧНО",
    images: [
      {
        url: "https://dev.zvuchno.space/images/main-banner.png",
        width: 1200,
        alt: "ЗВУЧНО — Маркетплейс цифровой музыки для СНГ артистов. Изображение винилового проигрывателя",
      },
    ],
    locale: "ru_RU",
    type: "website",
    url: "https://dev.zvuchno.space",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default async function Home() {
  // eslint-disable-next-line react-hooks/purity
  const started = performance.now();

  const [artistsResult, albumsResult, merchResult] = await Promise.allSettled([
    measure("artists", () => getArtistsListServer({ limit: "3" })),
    measure("albums", () => getCatalogListServer({ type: "album", limit: "4" })),
    measure("merch", () => getCatalogListServer({ type: "merch", limit: "4" })),
  ]);

  // eslint-disable-next-line react-hooks/purity
  console.info(`[home] all requests settled: ${(performance.now() - started).toFixed(0)} ms`);

  const artistsRes = artistsResult.status === "fulfilled" ? artistsResult.value : null;
  const albumsRes = albumsResult.status === "fulfilled" ? albumsResult.value : null;
  const merchRes = merchResult.status === "fulfilled" ? merchResult.value : null;

  return (
    <HomePage
      artists={artistsRes?.results ?? []}
      albums={albumsRes?.results ?? []}
      merch={merchRes?.results ?? []}
    />
  );
}
