"use client";

import { useEffect } from "react";

import { getArtistsListClient } from "@/api/catalog/artistsListApi/getArtistsListClient";
import type { TArtistsListResponse } from "@/api/catalog/artistsListApi/types";
import { getCatalogListClient } from "@/api/catalog/catalogListApi/getCatalogListClient";
import type { TCatalogListResponse } from "@/api/catalog/catalogListApi/types";
import { type InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { usePlayerStore } from "@/features/player";

//import { useCart } from "@/entities/cart";

import { TRANSLATIONS } from "@/shared/constants";
import { Loader } from "@/shared/ui";

import type { ProductsListProps } from "./ProductsList.types";
import { isArtistCard, isProductCard } from "./ProductsList.types";
import s from "./ProductsListClient.module.scss";
import { ProductListUI } from "./ui/ProductListUI";
import { handlePlayRelease } from "./utils/handlePlayRelease";

const ProductsListClient = ({
  category,
  filterByGenre,
  filterBySubcategory,
  filterByArtist,
  orderingFilter,
  offset,
  search,
  initialPage,
}: ProductsListProps & { initialPage: TArtistsListResponse | TCatalogListResponse | null }) => {
  const { data, isLoading, error, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<
      TArtistsListResponse | TCatalogListResponse,
      Error,
      InfiniteData<TArtistsListResponse | TCatalogListResponse>
    >({
      queryKey: [
        "catalog",
        category,
        filterByGenre,
        filterBySubcategory,
        orderingFilter,
        filterByArtist,
        search,
        offset,
      ],
      initialPageParam: "",
      initialData: initialPage ? { pages: [initialPage], pageParams: [""] } : undefined,
      staleTime: 60_000,
      queryFn: async ({ pageParam }) => {
        const url = pageParam as string | undefined;
        if (category === "artists") {
          return getArtistsListClient({
            genre: filterByGenre,
            limit: "15",
            offset,
            ordering: orderingFilter,
            search,
            ...(url && { url }),
          });
        }
        return getCatalogListClient({
          type: category,
          genre: filterByGenre,
          kind: filterBySubcategory,
          artist: filterByArtist,
          limit: "16",
          offset,
          ordering: orderingFilter,
          search,
          ...(url && { url }),
        });
      },
      getNextPageParam: (lastPage) => lastPage?.next,
    });

  const artistsCards = data?.pages.flatMap((page) => page?.results.filter(isArtistCard)) ?? [];
  const productCards = data?.pages.flatMap((page) => page?.results.filter(isProductCard)) ?? [];
  const handleNextPage = () => {
    fetchNextPage().catch(console.error);
  };
  const { playingAlbumId, togglePlay, playAlbum, setPlayingAlbumId } = usePlayerStore();

  const { status } = useSession();
  const isAuth = status === "authenticated";

  const searchParams = useSearchParams();

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

  const onHahdlePlay = (id: number) =>
    handlePlayRelease({
      playAlbum: playAlbum,
      playingAlbumId: playingAlbumId,
      setPlayingAlbumId: setPlayingAlbumId,
      togglePlay: togglePlay,
      releaseId: id,
    });

  if (isLoading) return <Loader minHeight='60vh' />;
  if (error)
    return (
      <div className={s.message}>{`Не удалось загрузить категорию: ${TRANSLATIONS[category]}`}</div>
    );

  if (category === "artists" && artistsCards.length === 0) {
    return <div className={s.message}>Ничего не найдено</div>;
  }

  if (category !== "artists" && productCards.length === 0) {
    return <div className={s.message}>Ничего не найдено</div>;
  }

  return (
    <ProductListUI
      artistsCards={artistsCards}
      productCards={productCards}
      isAuth={isAuth}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      onClickNext={handleNextPage}
      onHahdlePlay={onHahdlePlay}
      playingAlbumId={playingAlbumId}
      error={error}
    />
  );
};

export default ProductsListClient;
