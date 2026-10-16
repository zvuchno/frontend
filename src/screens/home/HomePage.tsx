"use client";

import toast from "react-hot-toast";



import { type TArtistCard } from "@/api/catalog/artistsListApi/types";
import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";
import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import { useSession } from "next-auth/react";



import { useFavorites } from "@/app/favorites/useFavorites";



//import { SectionFAQ } from "@/widgets/SectionFAQ";
import { HeroUI } from "@/widgets/layout/main/Hero";
import { JoinSection } from "@/widgets/layout/main/JoinSection";



import { usePlayerStore } from "@/features/player";



//import { useCart } from "@/entities/cart";
import { useRecentlyViewed } from "@/entities/recentlyViewed";



//import { mockBlogs, questions } from "@/shared/constants";

import styles from "./HomePage.module.scss";
import { ArtistsSection } from "./components/ArtistsSection";
import { MerchSection } from "./components/MerchSection";
import { MusicSection } from "./components/MusicSection";






























//import { Blog } from "./components/Blog/Blog";

interface HomePageProps {
  artists: TArtistCard[];
  albums: TCatalogCard[];
  merch: TCatalogCard[];
}

export function HomePage({ artists, albums, merch }: HomePageProps) {
  const { addProduct } = useRecentlyViewed();

  const { status } = useSession();
  const isAuth = status === "authenticated";

  const { playingAlbumId, togglePlay, playAlbum, setPlayingAlbumId } = usePlayerStore();

  //const { data } = useCart();
  const { data: favorites } = useFavorites();
  const favoriteItems = favorites?.results;
  const favoritesDigital = favoriteItems?.filter((item) => item.target.type === "release");
  const favoritesMerch = favoriteItems?.filter((item) => item.target.type === "merch");

  //const cartItems = data?.items;
  //const digitalCartItems = cartItems?.filter((item) => item.target.type === "release");
  //const merchCartItems = cartItems?.filter((item) => item.target.type === "merch");

  const handlePlayRelease = async (releaseId: number) => {
    if (playingAlbumId === releaseId) {
      await togglePlay();
      return;
    }

    try {
      const data = await getTracksList({ albumId: releaseId });
      const tracks = data?.tracks;
      if (!tracks?.length) return;
      playAlbum(tracks, 0);
      setPlayingAlbumId(releaseId);
    } catch (err) {
      console.error("Не удалось загрузить треки релиза", err);
      toast.error("Не удалось загрузить треки релиза");
    }
  };

  return (
    <div className={styles.page}>
      <HeroUI />

      <div className={styles.mainContent}>
        <ArtistsSection artists={artists} />

        <MusicSection
          albums={albums}
          //cartItems={digitalCartItems}
          handlePlayRelease={handlePlayRelease}
          playingAlbumId={playingAlbumId}
          addProduct={addProduct}
          isAuth={isAuth}
          favorites={favoritesDigital}
        />

        <MerchSection
          merch={merch}
          //cartItems={merchCartItems}
          isAuth={isAuth}
          addProduct={addProduct}
          favorites={favoritesMerch}
        />
        {/**скрываем секцию БЛОГ и FAQ пока нет данных */}
        {/*<Blog blogs={mockBlogs} />

        <SectionFAQ title='FAQ' items={questions} />*/}
      </div>

      <JoinSection link='https://t.me/zvuchno_space' />
    </div>
  );
}
