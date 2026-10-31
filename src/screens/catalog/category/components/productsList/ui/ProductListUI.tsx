import { type TArtistCard } from "@/api/catalog/artistsListApi/types";
import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";
import clsx from "clsx";
import Link from "next/link";

import { ButtonLike } from "@/features/ButtonLike";

import { CardArtist } from "@/entities/Artist";
import { ProductCard } from "@/entities/ProductCard";

import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

import s from "./../ProductsListClient.module.scss";

export const ProductListUI = ({
  artistsCards,
  productCards,
  isAuth,
  isFetchingNextPage,
  hasNextPage,
  onClickNext,
  onHahdlePlay,
  playingAlbumId,
  error,
}: {
  artistsCards: TArtistCard[];
  productCards: TCatalogCard[];
  isAuth: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onClickNext: () => void;
  onHahdlePlay: (id: number) => Promise<void>;
  playingAlbumId: number | null;
  error: Error | null;
}) => {
  return (
    <div className={s.container}>
      {artistsCards && artistsCards.length > 0 && (
        <ul className={clsx(s.cardList, s.artistsList)}>
          {artistsCards.map((artist) => (
            <li key={artist.slug} className={s.artistsGrid}>
              <Link href={`/catalog/artists/${artist.slug}`} className={s.artistsGrid}>
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

            const basePath = `/catalog/${product.target.type}/${id}/`;

            const href =
              product.target.type === "merch" || !selected
                ? basePath
                : `${basePath}?selected=${encodeURIComponent(selected)}`;

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
                  link={href}
                  isRelease={product.target.type === "release"}
                  isPlaying={playingAlbumId === product.target.id}
                  onPlay={() => void onHahdlePlay(product.target.id)}
                />
              </li>
            );
          })}
        </ul>
      )}

      {hasNextPage && !error && (
        <button className={s.button} onClick={onClickNext} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "загрузка..." : "смотреть ещё"}
        </button>
      )}
    </div>
  );
};
