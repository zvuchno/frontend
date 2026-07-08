import { getArtistsList } from "@/api/catalog/artistsListApi/getArtistsList";
import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import { authConfig } from "@/config/auth";
import { HomePage } from "@/screens/home";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authConfig);
  const accessToken = session?.user.accessToken;
  const [artistsRes, albumsRes, merchRes] = await Promise.all([
    getArtistsList({ limit: '3' }),
    getCatalogList({token: accessToken, type: "album", limit: '4' }),
    getCatalogList({token: accessToken, type: "merch", limit: '4' }),
  ])
  return (
    <HomePage 
      artists={artistsRes.results} 
      albums={albumsRes.results} 
      merch={merchRes.results}
    />
  )
};