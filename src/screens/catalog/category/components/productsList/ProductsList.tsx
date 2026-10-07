"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

import type { TArtistsListResponse } from "@/api/catalog/artistsListApi/types";
import type { TCatalogListResponse } from "@/api/catalog/catalogListApi/types";
import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { ButtonLike } from "@/features/ButtonLike";
import { usePlayerStore } from "@/features/player";

import { CardArtist } from "@/entities/Artist";
import { ProductCard } from "@/entities/ProductCard";

import { Loader } from "@/shared/ui";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

import s from "./ProductsList.module.scss";
import {
  type ProductsListProps,
  isArtistCard,
  isProductCard,
} from "./ProductsList.types";
import { useSearchParams } from "next/navigation";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { getArtistsListClient } from "@/api/catalog/artistsListApi/getArtistsListClient";
import { getCatalogListClient } from "@/api/catalog/catalogListApi/getCatalogListClient";
import { TRANSLATIONS } from "@/shared/constants";

const ProductsList = ({ 
  category, 
  filterByGenre, 
  filterBySubcategory, 
  filterByArtist, 
  orderingFilter, 
  offset, 
  search 
}: ProductsListProps) => {

  const { playingAlbumId, togglePlay, playAlbum, setPlayingAlbumId } = usePlayerStore();

  const { status } = useSession();
  const isAuth = status === "authenticated";

  const searchParams = useSearchParams();

  const { data, isLoading, error, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery<
      TArtistsListResponse | TCatalogListResponse,
      Error,
      InfiniteData<TArtistsListResponse | TCatalogListResponse>
  >({
    queryKey: ["catalog", category, filterByGenre, filterBySubcategory, orderingFilter],
    queryFn: async ({ pageParam }) => {
      const url = pageParam as string | undefined;
      if (category === 'artists') {
        const res = await getArtistsListClient({
          genre: filterByGenre,
          limit: '15',
          offset,
          ordering: orderingFilter,
          ...(url && { url: url }),
        });
        return res;
      } else {
        const res = await getCatalogListClient({
          type: category,
          genre: filterByGenre,
          kind: filterBySubcategory,
          artist: filterByArtist,
          limit: '16',
          offset,
          ordering: orderingFilter,
          search,
          ...(url && { url: url }),
        });
        return res;
      }
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next,
    staleTime: 1 * 60 * 1000,
  });

  const artistsCards = data?.pages.flatMap((page) => page?.results.filter(isArtistCard)) ?? [];
  const productCards = data?.pages.flatMap((page) => page?.results.filter(isProductCard)) ?? [];

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("lastCatalogScroll", String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const lastScroll = sessionStorage.getItem("lastCatalogScroll");
    if (lastScroll && window.scrollY === 0) {
      window.scrollTo({ top: Number(lastScroll), behavior: "smooth" });
    }
  }, [searchParams]);

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

  if (isLoading) return <Loader minHeight="60vh" /> ;
  if (error) return <div className={s.message}>{`Не удалось загрузить категорию: ${TRANSLATIONS[category]}`}</div>

  if (category === "artists" && artistsCards.length === 0) {
    return <div className={s.message}>Ничего не найдено</div>;
  }

  if (category !== "artists" && productCards.length === 0) {
    return <div className={s.message}>Ничего не найдено</div>;
  }

  return (
    <div className={s.container}>
      {artistsCards && artistsCards.length > 0 && (
        <ul className={clsx(s.cardList, s.artistsList)}>
          {artistsCards.map((artist) => (
            <li key={artist.slug} className={s.artistsGrid}>
              <Link
                href={`/catalog/artists/${artist.slug}/?kind=artists`}
                className={s.artistsGrid}
              >
                <CardArtist
                  image={artist.cover ?? undefined}
                  description={artist.name}
                  hasButton={false}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {productCards && productCards.length > 0 && (
        <ul className={s.cardList}>
          {productCards.map((product) => {
            const url = product.target.url;
            const match = url.match(/(\d+)\/$/);
            const id = match ? match[1] : null;
            const selected =
              product.target.selected_variant_id !== null
                ? product.target.selected_variant_id
                : undefined;
            return (
              <li key={product.product_id} className={s.productCardLink}>
                <ProductCard
                  image={product.image}
                  title={product.artist_name}
                  description={
                    product.year === null
                      ? `${product.name}`
                      : `${product.name} (${product.year.toString()})`
                  }
                  price={product.price}
                  likeButton={
                    <ButtonLike
                      isLiked={product.is_favorite}
                      isAuth={isAuth}
                      onToggle={(isLiked) => {
                        handleToggleFavorites(isLiked, product.favorite_variant_id).catch(
                          console.error
                        );
                      }}
                    />
                  }
                  link={`/catalog/release/${id}/?kind=${product.target.type}&selected=${selected}`}
                  isRelease={product.target.type === "release"}
                  isPlaying={playingAlbumId === product.target.id}
                  onPlay={() => handlePlayRelease(product.target.id)}
                />
              </li>
            );
          })}
        </ul>
      )}

      {hasNextPage && !error && (
        <button
          className={s.button}
          onClick={() => {
            fetchNextPage().catch(console.error);
            // if (nextLink) {
            //   void handleLoadMore(nextLink);
            // }
          }}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "загрузка..." : "смотреть ещё"}
        </button>
      )}
    </div>
  );
};

export default ProductsList;
