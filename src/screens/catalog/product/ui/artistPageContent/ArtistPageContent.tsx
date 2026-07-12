"use client";

import { useQuery } from "@tanstack/react-query";

import { ArtistDetailCard } from "@/widgets/ArtistDetailCard";
import { type TDetalArtist } from "@/widgets/ArtistDetailCard";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";
import { useRecentlyViewed } from "@/entities/recentlyViewed";

import { ListSection } from "@/shared/ui";
import { useUserStore } from "@/entities/user";
import { getCatalogListClient } from "@/api/catalog/catalogListApi/getCatalogListClient";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";

interface IArtistPageContentProps {
  artist: TDetalArtist;
}

const ArtistPageContent = ({ artist }: IArtistPageContentProps) => {
  const { addProduct } = useRecentlyViewed();
  const user = useUserStore((state) => state.user);
  const isAuth = !!user?.id;

  const queryAlbums = useQuery({
    queryKey: ["recom", "album", artist.slug],
    queryFn: () =>
      getCatalogListClient({
        type: "album",
        artist: artist.slug,
        ordering: "random",
        limit: "4",
      }),
    refetchOnWindowFocus: false,
  });

  const queryMerch = useQuery({
    queryKey: ["recom", "merch", artist.slug],
    queryFn: () =>
      getCatalogListClient({
        type: "merch",
        artist: artist.slug,
        ordering: "random",
        limit: "4",
      }),
    refetchOnWindowFocus: false,
  });

  const albumsRecommend = queryAlbums.data?.results;
  const hasMoreAlbums = !!queryAlbums.data?.next;
  const merchRecommend = queryMerch.data?.results;
  const hasMoreMerch = !!queryMerch.data?.next;

  return (
    <>
      <ArtistDetailCard artist={artist} />
      {albumsRecommend && albumsRecommend.length > 0 && (
        <ListSection
          title='Музыка'
          link={`/catalog/album/?artist=${artist.slug}`}
          hasMore={hasMoreAlbums}
        >
          {albumsRecommend.map((item) => {
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
                    onToggle={(isLiked) => handleToggleFavorites(isLiked, item.favorite_variant_id)}
                  />
                }
                link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
                onHandleClick={() => addProduct(item)}
              />
            );
          })}
        </ListSection>
      )}
      {merchRecommend && merchRecommend.length > 0 && (
        <ListSection
          title='Мерч'
          link={`/catalog/merch?artist=${artist.slug}`}
          hasMore={hasMoreMerch}
        >
          {merchRecommend.map((item) => {
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
                    onToggle={(isLiked) => handleToggleFavorites(isLiked, item.favorite_variant_id)}
                  />
                }
                link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
                onHandleClick={() => addProduct(item)}
              />
            );
          })}
        </ListSection>
      )}
    </>
  );
};

export default ArtistPageContent;
