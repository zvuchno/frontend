import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";

import { HomePage } from "@/screens/home";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [artistsResult, albumsResult, merchResult] = await Promise.allSettled([
    getArtistsListServer({ limit: "3" }),
    getCatalogListServer({ type: "album", limit: "4" }),
    getCatalogListServer({ type: "merch", limit: "4" }),
  ]);

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
