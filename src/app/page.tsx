import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";

import { HomePage } from "@/screens/home";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [artistsRes, albumsRes, merchRes] = await Promise.all([
    getArtistsListServer({ limit: "3" }),
    getCatalogListServer({ type: "album", limit: "4" }),
    getCatalogListServer({ type: "merch", limit: "4" }),
  ]);
  return (
    <HomePage
      artists={artistsRes?.results ?? []}
      albums={albumsRes?.results ?? []}
      merch={merchRes?.results ?? []}
    />
  );
}
