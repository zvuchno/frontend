"use client";

import { useEffect, useState } from "react";

import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import { type TArtistCard } from "@/api/catalog/artistsListApi/types";
import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { ButtonLike } from "@/features/ButtonLike";

import { CardArtist } from "@/entities/Artist";
import { ProductCard } from "@/entities/ProductCard";

import { ButtonUI } from "@/shared/ui";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

import s from "./ProductsList.module.scss";
import {
  type ProductsListProps,
  type ProductsListResponse,
  isArtistCard,
  isProductCard,
} from "./ProductsList.types";

const ProductsList = ({ products, link }: ProductsListProps) => {
  const [allProducts, setAllProducts] = useState<TCatalogCard[] | TArtistCard[] | []>(products);
  const [nextLink, setNextLink] = useState<string | null>(link);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { status } = useSession();
  const isAuth = status === "authenticated";

  useEffect(() => {
    setAllProducts(products);
    setNextLink(link);
    setError(null);
  }, [products, link]);

  const handleLoadMore = async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authFetchClient<ProductsListResponse>(url, {
        method: "GET",
      });

      if (!data) throw new Error("Ошибка получения карточек каталога");

      setAllProducts((prev) => [...prev, ...data.results]);
      setNextLink(data.next);
    } catch {
      setError("Не удалось загрузить данные");
    } finally {
      setIsLoading(false);
    }
  };

  const artistsCards = allProducts.filter(isArtistCard);
  const productCards = allProducts.filter(isProductCard);

  if (products.length === 0) {
    return <div className={s.message}>Ничего не найдено</div>;
  } else {
    return (
      <div className={s.container}>
        {artistsCards.length > 0 && (
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

        {productCards.length > 0 && (
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
                        ? `${product.kind} ${product.name}`
                        : `${product.kind} ${product.name} (${product.year.toString()})`
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
                  />
                </li>
              );
            })}
          </ul>
        )}

        {error && (
          <div className={s.errorBlock}>
            <p className={s.message}>{error}</p>
            <ButtonUI
              variant='primary'
              className={s.retryButton}
              onClick={() => {
                if (nextLink) {
                  void handleLoadMore(nextLink);
                }
              }}
            >
              Повторить запрос
            </ButtonUI>
          </div>
        )}

        {nextLink && !error && (
          <button
            className={s.button}
            onClick={() => {
              if (nextLink) {
                void handleLoadMore(nextLink);
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? "загрузка..." : "смотреть ещё"}
          </button>
        )}
      </div>
    );
  }
};

export default ProductsList;
