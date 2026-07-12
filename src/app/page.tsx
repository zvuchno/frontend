import { getArtistsListServer } from "@/api/catalog/artistsListApi/getArtistsListServer";
import { getCatalogListServer } from "@/api/catalog/catalogListApi/getCatalogListServer";
import { authConfig } from "@/config/auth";
import { HomePage } from "@/screens/home";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authConfig);
  const token = session?.user.accessToken;

  const [artistsRes, albumsRes, merchRes] = await Promise.all([
    getArtistsListServer({ limit: '3', token }),
    getCatalogListServer({ type: "album", limit: '4', token }),
    getCatalogListServer({ type: "merch", limit: '4', token }),
  ])
  return (
    <HomePage 
      artists={artistsRes?.results ?? []} 
      albums={albumsRes?.results ?? []} 
      merch={merchRes?.results ?? []}
    />
  )
};