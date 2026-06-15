"use client";

import { ProductCard } from "@/entities";
import { useEffect, useState } from "react";
import s from "./ProductsList.module.scss";
import { isArtistCard, isProductCard, ProductsListProps, ProductsListResponse } from "./ProductsList.types";
import { ButtonUI } from "@/shared/ui";
import { TCatalogCard } from "@/api/catalog/catalogListApi/types";
import { TArtistCard } from "@/api/catalog/artistsListApi/types";
import { ButtonLike } from "@/features";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import clsx from "clsx";
import Link from "next/link";

const ProductsList = ({ products, link }: ProductsListProps) => {
  const [allProducts, setAllProducts] = useState<TCatalogCard[] | TArtistCard[] | []>([]);
  const [nextLink, setNextLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAllProducts(products);
    setNextLink(link);
    setError(null);
  }, [products, link]);

  const handleLoadMore = async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Ошибка получения карточек каталога");

      const data: ProductsListResponse = await res.json();

      setAllProducts((prev) => [...prev, ...data.results]);
      setNextLink(data.next);
    } catch (error) {
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
          <ul className={clsx(s.cardList, s.artistsGrid)}>
            {artistsCards.map((artist) => (
              <li key={artist.slug}>
                <Link href={`/catalog/artists/${artist.slug}/?kind=artists`}>
                  <CardArtist
                    image={artist.cover ?? undefined} 
                    description={artist.name}
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
              const selected = product.target.selected_variant_id !== null ? product.target.selected_variant_id : undefined
              return (
                <li key={product.product_id}>
                  <ProductCard
                    image={product.image}
                    title={product.artist_name}
                    description={product.year === null ? product.name : `${product.name} (${product.year.toString()})`}
                    price={product.price}
                    likeButton={<ButtonLike isLiked={product.is_favorite} />}
                    link={`/catalog/album/${id}/?kind=${product.target.type}&selected=${selected}`}
                  />
                </li>
            )})}
          </ul>
        )}

        {error && (
          <div className={s.errorBlock}>
            <p className={s.message}>{error}</p>
            <ButtonUI
              variant="primary"
              className={s.retryButton}
              onClick={() => nextLink && handleLoadMore(nextLink)}
            >
              Повторить запрос
            </ButtonUI>
          </div>
        )}

        {nextLink && !error && (
          <button
            className={s.button}
            onClick={() => handleLoadMore(nextLink)}
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
