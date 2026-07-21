"use client";

import { useQuery } from "@tanstack/react-query";

import { ArtistDetailCard } from "@/widgets/ArtistDetailCard";
import { type TDetalArtist } from "@/widgets/ArtistDetailCard";

import { ButtonLike } from "@/features/ButtonLike";

import { ProductCard } from "@/entities/ProductCard";
import { useRecentlyViewed } from "@/entities/recentlyViewed";

import { ListSection, Loader } from "@/shared/ui";
import { getCatalogListClient } from "@/api/catalog/catalogListApi/getCatalogListClient";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";
import { useSession } from "next-auth/react";

interface IArtistPageContentProps {
  artist: TDetalArtist;
}

const ArtistPageContent = ({ artist }: IArtistPageContentProps) => {
  const { addProduct } = useRecentlyViewed();
  const { status, data: session } = useSession();

  const isAuth = status === 'authenticated';
  const token = session?.user.accessToken;
  const hasFetching = isAuth || status === 'unauthenticated';

  const queryAlbums = useQuery({
    queryKey: ["recom", "album", artist.slug],
    queryFn: () =>
      getCatalogListClient({
        token,
        type: "album",
        artist: artist.slug,
        ordering: "random",
        limit: "4",
      }),
      enabled: hasFetching,
  });

  const queryMerch = useQuery({
    queryKey: ["recom", "merch", artist.slug],
    queryFn: () =>
      getCatalogListClient({
        token,
        type: "merch",
        artist: artist.slug,
        ordering: "random",
        limit: "4",
      }),
      enabled: hasFetching,
  });

  const albumsRecommend = queryAlbums.data?.results;
  const hasMoreAlbums = !!queryAlbums.data?.next;
  const merchRecommend = queryMerch.data?.results;
  const hasMoreMerch = !!queryMerch.data?.next;

  if (status === 'loading') {
    return <Loader />;
  }

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
                    onToggle={(isLiked) => {
                      handleToggleFavorites(isLiked, item.favorite_variant_id, token).catch(console.error)
                    }}
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
                    onToggle={(isLiked) => {
                      handleToggleFavorites(isLiked, item.favorite_variant_id, token).catch(console.error)
                    }}
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
