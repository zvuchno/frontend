import { getArtistsList } from "@/api/catalog/artistsListApi/getArtistsList";
import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import { HomePage } from "@/screens/home";

export default async function Home() {
  const [artistsRes, albumsRes, merchRes] = await Promise.all([
    getArtistsList({ limit: '3' }),
    getCatalogList({ type: "album", limit: '4' }),
    getCatalogList({ type: "merch", limit: '4' }),
  ])
  return (
    <HomePage 
      artists={artistsRes.results} 
      albums={albumsRes.results} 
      merch={merchRes.results}
    />
  )
};