"use client"

import { ArtistDetailCard } from "@/widgets/ArtistDetailCard";
import { TDetalArtist } from "@/widgets/ArtistDetailCard/model/ArtistDetailCard.types";
import { useQuery } from "@tanstack/react-query";
import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import { ListSection } from "@/shared/ui";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";

interface IArtistPageContentProps {
  artist: TDetalArtist;
}

const ArtistPageContent = ({ artist }: IArtistPageContentProps) => {

  const queryAlbums = useQuery({ 
    queryKey: ['recom', 'album', artist.slug], 
    queryFn: () => getCatalogList({
      type: 'album',
      artist: artist.slug,
      ordering: 'random',
      limit: "4"
    }),
    refetchOnWindowFocus: false,
  });

  const queryMerch = useQuery({ 
    queryKey: ['recom', 'merch', artist.slug], 
    queryFn: () => getCatalogList({
      type: 'merch',
      artist: artist.slug,
      ordering: 'random',
      limit: "4"
    }),
    refetchOnWindowFocus: false,
  });

  const albumsRecommend = queryAlbums.data?.results;
  const merchRecommend = queryMerch.data?.results;

  return (
    <>
      <ArtistDetailCard artist={artist} />
      {albumsRecommend && albumsRecommend.length > 0 && (
        <ListSection title="Музыка" link={`/catalog/album/?artist=${artist.slug}`}>
          {albumsRecommend.map((item) => {
            const url = item.target.url;
            const match = url.match(/(\d+)\/$/);
            const id = match ? match[1] : null;
            const selected = item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined
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
                likeButton={<ButtonLike isLiked={item.is_favorite} />}
                link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
              />
          )})}
        </ListSection>
      )}
      {merchRecommend && merchRecommend.length > 0 && (
        <ListSection title="Мерч" link={`/catalog/merch?artist=${artist.slug}`}>
          {merchRecommend.map((item) => {
            const url = item.target.url;
            const match = url.match(/(\d+)\/$/);
            const id = match ? match[1] : null;
            const selected = item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined
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
                likeButton={<ButtonLike isLiked={item.is_favorite} />}
                link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
              />
          )})}
        </ListSection>
      )}
    </>
  )
};

export default ArtistPageContent;