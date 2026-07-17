"use client";

import {  useState } from "react";

import { getFavoriteProducts } from "@/api/store";
import { useSession } from "next-auth/react";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";

import styles from "./favoritesPageClient.module.scss";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { type PaginatedStoreResponse, type StoreFavorite } from "@/api/store/types";
import { deleteFromFavorites } from "@/api/catalog/favoritesApi/deleteFromFavorites";
import toast from "react-hot-toast";
import { RateLimitError } from "@/api/authFetchFromClient/authFetchClient";
import { Loader } from "@/shared/ui";

export function FavoritesPageClient() {
  const { status, data: session } = useSession();
  const token = session?.user.accessToken;
  const [deletingFavoriteId, setDeletingFavoriteId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    PaginatedStoreResponse<StoreFavorite>,
    Error,
    InfiniteData<PaginatedStoreResponse<StoreFavorite>>
  >({
    queryKey: ["listener", "favorites"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getFavoriteProducts(token, url);
      return getFavoriteProducts(token);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
  })

  const cards = data?.pages.flatMap((page) => page.results) ?? [];

  const handleDeleteFavorite = async (favoriteId: number | undefined, isLiked: boolean) => {
    if (!favoriteId || isLiked) {
      return;
    }

    setDeletingFavoriteId(favoriteId);

    try {
      await deleteFromFavorites({
        product_variant: favoriteId,
      })
      await queryClient.invalidateQueries({ queryKey: ['listener', 'favorites'] });
      toast.success('Удалено из избранного');

    } catch(error) {
      if (error instanceof RateLimitError) {
        const waitSeconds = Math.ceil(error.retryAfterMs / 1000);
        toast.error(`Слишком много запросов. Попробуйте через ${waitSeconds} сек.`);
      }
      toast.error('Не удалось удалить из избранного')
      console.error('Ошибка при при удалении из избранного:', error);
      
    } finally {
      setDeletingFavoriteId(null);
    }
  };

  if (status !== "authenticated" || isLoading) {
    return <Loader />
  }

  if (error) {
    return <p className={styles.stateMessage}>Не удалось загрузить избранное</p>;
  }

  if (cards.length === 0) {
    return <p className={styles.stateMessage}>В избранном пока ничего нет</p>;
  }

  return (
    <div className={styles.container}>
      {cards.map((card) => {
        const url = card.target.url;
        const match = url.match(/(\d+)\/$/);
        const id = match ? match[1] : null;
        const selected =
          card.target.selected_variant_id !== null
            ? card.target.selected_variant_id
            : undefined;
        return (
          <ProductCard
            key={card.product_variant}
            image={card.image}
            title={card.artist_name}
            description={`${card.kind} ${card.name}`}
            price={card.price}
            likeButton={
              <ButtonLike 
                isLiked={true} 
                isAuth={true}
                disabled={deletingFavoriteId === card.product_variant}
                onToggle={(isLiked) => {
                  handleDeleteFavorite(card.product_variant, isLiked).catch(console.error)
                }}
              />
            }
            link={`/catalog/release/${id}/?kind=${card.target.type}&selected=${selected}`}
          />
        )
      })}
      {hasNextPage && (
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              fetchNextPage().catch(console.error)
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "загрузка..." : "смотреть ещё"}
          </button>
        </div>
      )}
    </div>
  );
}
