"use client";

import { useEffect, useState } from "react";

import { type FanProductCardData, deleteFavorite, getFavoriteProducts } from "@/api/store";
import { useSession } from "next-auth/react";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";

import styles from "./favoritesPageClient.module.scss";

export function FavoritesPageClient() {
  const { status } = useSession();
  const [cards, setCards] = useState<FanProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletingFavoriteId, setDeletingFavoriteId] = useState<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let isCurrentRequest = true;

    const loadFavorites = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const favoriteCards = await getFavoriteProducts();

        if (isCurrentRequest) {
          setCards(favoriteCards);
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setErrorMessage(
            requestError instanceof Error ? requestError.message : "Не удалось загрузить избранное"
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    void loadFavorites();

    return () => {
      isCurrentRequest = false;
    };
  }, [status]);

  const handleFavoriteToggle = async (favoriteId: number | undefined, isLiked: boolean) => {
    if (!favoriteId || isLiked) {
      return;
    }

    setDeletingFavoriteId(favoriteId);
    setErrorMessage(null);

    try {
      await deleteFavorite(favoriteId);
      setCards((currentCards) => currentCards.filter((card) => card.favoriteId !== favoriteId));
    } catch (requestError) {
      setErrorMessage(
        requestError instanceof Error ? requestError.message : "Не удалось удалить из избранного"
      );
    } finally {
      setDeletingFavoriteId(null);
    }
  };

  if (status !== "authenticated" || isLoading) {
    return <p className={styles.stateMessage}>Загрузка избранного...</p>;
  }

  if (errorMessage) {
    return <p className={styles.stateMessage}>{errorMessage}</p>;
  }

  if (cards.length === 0) {
    return <p className={styles.stateMessage}>В избранном пока ничего нет</p>;
  }

  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <ProductCard
          key={`${card.favoriteId}-${card.id}`}
          image={card.image}
          title={card.title}
          description={card.description}
          price={card.price ?? undefined}
          likeButton={
            <ButtonLike
              isLiked={true}
              disabled={deletingFavoriteId === card.favoriteId}
              onToggle={(isLiked) => void handleFavoriteToggle(card.favoriteId, isLiked)}
            />
          }
        />
      ))}
    </div>
  );
}
