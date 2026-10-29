import { type MetadataRoute } from "next";

const baseApiUrl =
  process.env.NODE_ENV === "development"
    ? (process.env.BASE_API_URL_DEV ?? process.env.NEXT_PUBLIC_BASE_API_URL)
    : (process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL);

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : (process.env.FRONTEND_ORIGIN ?? "https://zvuchno.space");

type TSitemapItem = {
  type: "release" | "merch" | "artists";
  id: number | null;
  slug: string | null;
  lastmod: string;
};

const mainPages = [
  "",
  "catalog/all",
  "catalog/album",
  "catalog/merch",
  "catalog/artists",
  "contacts",
  "for-artists",
];

const getSitemapData = async (): Promise<TSitemapItem[]> => {
  const res = await fetch(`${baseApiUrl}/v1/sitemap-data`);

  if (!res.ok) {
    console.error(`Ошибка получения sitemap приложения: ${res.statusText}`);
    throw new Error(`Failed to fetch sitemap data: ${res.status}`);
  }

  const data: TSitemapItem[] = (await res.json()) as TSitemapItem[];

  return data;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicPages = await getSitemapData();

  const dynamicPagesSitemap: MetadataRoute.Sitemap = dynamicPages.map((page) => {
    const type = page.type;
    const dynamicUrl = `catalog/${type}/${type === "artists" ? page.slug : page.id}`;
    return {
      url: `${baseUrl}/${dynamicUrl}`,
      lastModified: page.lastmod,
      changeFrequency: "weekly",
      priority: 0.9,
    };
  });

  const mainPagesSitemap: MetadataRoute.Sitemap = mainPages.map((page) => {
    return {
      url: `${baseUrl}/${page}`,
      changeFrequency: "daily",
      priority: 1,
    };
  });

  const sitemap = mainPagesSitemap.concat(dynamicPagesSitemap);

  return sitemap;
}
