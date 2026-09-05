"use client";

import toast from "react-hot-toast";

import { type TArtistCard } from "@/api/catalog/artistsListApi/types";
import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";
import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import { useSession } from "next-auth/react";
import Link from "next/link";

//import { SectionFAQ } from "@/widgets/SectionFAQ";
import { HeroUI } from "@/widgets/layout/main/Hero";
import { JoinSection } from "@/widgets/layout/main/JoinSection";

import { ButtonLike } from "@/features/ButtonLike";
import { usePlayerStore } from "@/features/player";

import { CardArtist } from "@/entities/Artist";
import { ProductCard } from "@/entities/ProductCard";
import { useRecentlyViewed } from "@/entities/recentlyViewed";

//import { mockBlogs, questions } from "@/shared/constants";
import { ListSection } from "@/shared/ui";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

import styles from "./HomePage.module.scss";

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

  const handlePlayRelease = async (releaseId: number) => {
    if (playingAlbumId === releaseId) {
      togglePlay();
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
        <ListSection title='Артисты' link={`/catalog/artists`}>
          {artists.map((artist) => (
            <Link
              key={artist.slug}
              href={`/catalog/artists/${artist.slug}/?kind=artists`}
              className={styles.mainContentCardLink}
            >
              <CardArtist
                image={artist.cover ?? undefined}
                description={artist.name}
                hasButton={false}
              />
            </Link>
          ))}
        </ListSection>

        <ListSection title='Музыка' link={`/catalog/album`}>
          {albums.map((item) => {
            const url = item.target.url;
            const match = url.match(/(\d+)\/$/);
            const id = match ? match[1] : null;
            const selected =
              item.target.selected_variant_id !== null
                ? item.target.selected_variant_id
                : undefined;
            return (
              <ProductCard
                key={item.product_id}
                title={item.artist_name}
                image={item.image}
                description={
                  item.year === null
                    ? `${item.kind} ${item.name}`
                    : `${item.kind} ${item.name} (${item.year.toString()})`
                }
                price={item.price ?? undefined}
                likeButton={
                  <ButtonLike
                    isLiked={item.is_favorite}
                    onToggle={(isLiked) => {
                      handleToggleFavorites(isLiked, item.favorite_variant_id).catch(console.error);
                    }}
                    isAuth={isAuth}
                  />
                }
                link={`/catalog/release/${id}/?kind=${item.target.type}&selected=${selected}`}
                onHandleClick={() => addProduct(item)}
                isRelease
                isPlaying={playingAlbumId === item.target.id}
                onPlay={() => handlePlayRelease(item.target.id)}
              />
            );
          })}
        </ListSection>

        <ListSection title='Мерч' link={`/catalog/merch`}>
          {merch.map((item) => {
            const url = item.target.url;
            const match = url.match(/(\d+)\/$/);
            const id = match ? match[1] : null;
            const selected =
              item.target.selected_variant_id !== null
                ? item.target.selected_variant_id
                : undefined;
            return (
              <ProductCard
                key={item.product_id}
                title={item.artist_name}
                image={item.image}
                description={
                  item.year === null
                    ? `${item.kind} ${item.name}`
                    : `${item.kind} ${item.name} (${item.year.toString()})`
                }
                price={item.price ?? undefined}
                likeButton={
                  <ButtonLike
                    isLiked={item.is_favorite}
                    onToggle={(isLiked) => {
                      handleToggleFavorites(isLiked, item.favorite_variant_id).catch(console.error);
                    }}
                    isAuth={isAuth}
                  />
                }
                link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
                onHandleClick={() => addProduct(item)}
              />
            );
          })}
        </ListSection>
        {/**скрываем секцию БЛОГ и FAQ пока нет данных */}
        {/*<Blog blogs={mockBlogs} />

        <SectionFAQ title='FAQ' items={questions} />*/}
      </div>

      <JoinSection link='https://t.me/zvuchno_space' />
    </div>
  );
}
