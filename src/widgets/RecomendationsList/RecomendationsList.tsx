"use client";

import { Suspense } from "react";

import { getCatalogListClient } from "@/api/catalog/catalogListApi/getCatalogListClient";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";
import { useRecentlyViewed } from "@/entities/recentlyViewed";

import { ListSection, Loader } from "@/shared/ui";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";
import { usePlayerStore } from "@/features/player";
import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import toast from "react-hot-toast";

export const RecomendationsList = () => {
  const { status } = useSession();
  const isAuth = status === "authenticated";

  const { togglePlay, playingAlbumId, playAlbum, setPlayingAlbumId } = usePlayerStore();

  const hasFetching = isAuth || status === "unauthenticated";

  const { viewedProducts, addProduct } = useRecentlyViewed();

  const recentViewedToShow = viewedProducts && viewedProducts.slice(0, 4);
  const limitToShow = "4";

  const path = usePathname();
  const isCartPage = path.includes("/cart");

  const recomQuery = useQuery({
    queryKey: ["recom", "album", limitToShow],
    queryFn: () =>
      getCatalogListClient({
        type: "album",
        ordering: "random",
        limit: limitToShow,
      }),
    enabled: hasFetching,
    refetchOnWindowFocus: false,
  });

  const showRecentViewed = isCartPage && viewedProducts.length > 0;

  const recommendations = showRecentViewed ? recentViewedToShow : recomQuery.data?.results;
  const hasMoreRecommendations = showRecentViewed ? false : !!recomQuery.data?.next;

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
      console.error('Не удалось загрузить треки релиза', err);
      toast.error("Не удалось загрузить треки релиза")
    }
  };

  if (!recommendations) return;

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <Suspense fallback={<div>Загрузка рекомендаций...</div>}>
      <ListSection
        title={showRecentViewed ? "Вы смотрели" : "Вам также может понравиться"}
        link={viewedProducts ? "" : `/catalog/album`}
        hasMore={hasMoreRecommendations}
      >
        {recommendations.map((item) => {
          const url = item.target.url;
          const match = url.match(/(\d+)\/$/);
          const id = match ? match[1] : null;
          const selected =
            item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined;
          return (
            <ProductCard
              key={item.product_id}
              title={item.artist_name}
              description={
                item.year === null
                  ? `${item.kind} ${item.name}`
                  : `${item.kind} ${item.name} (${item.year.toString()})`
              }
              image={item.image}
              price={item.price}
              likeButton={
                <ButtonLike
                  isLiked={item.is_favorite}
                  isAuth={isAuth}
                  onToggle={(isLiked) => {
                    handleToggleFavorites(isLiked, item.favorite_variant_id).catch(console.error);
                  }}
                />
              }
              link={`/catalog/release/${id}/?kind=${item.target.type}&selected=${selected}`}
              onHandleClick={() => addProduct(item)}
              isRelease={item.target.type === "release"}
              isPlaying={playingAlbumId === item.target.id}
              onPlay={() => handlePlayRelease(item.target.id)}
            />
          );
        })}
      </ListSection>
    </Suspense>
  );
};
