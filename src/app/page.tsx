import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";

import { HomePage } from "@/screens/home";

export const dynamic = "force-dynamic";

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
