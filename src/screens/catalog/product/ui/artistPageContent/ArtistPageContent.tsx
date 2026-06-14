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
    queryKey: ['recom', 'album'], 
    queryFn: () => getCatalogList({
      type: 'album',
      ordering: 'random',
      limit: "4"
    }),
    refetchOnWindowFocus: false,
  });

  const queryMerch = useQuery({ 
    queryKey: ['recom', 'merch'], 
    queryFn: () => getCatalogList({
      type: 'merch',
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
      {albumsRecommend && (
        <ListSection title="Музыка" link=''>
          {albumsRecommend.map((item) => (
            <ProductCard 
              key={item.product_id}
              title={item.artist_name}
              description={item.year === null ? item.name : `${item.name} (${item.year.toString()})`}
              image={item.image}
              price={item.price}
              likeButton={<ButtonLike isLiked={item.is_favorite} />}
            />
          ))}
        </ListSection>
      )}
      {merchRecommend && (
        <ListSection title="Мерч" link="">
          {merchRecommend.map((item) => (
            <ProductCard 
              key={item.product_id}
              title={item.artist_name}
              description={item.year === null ? item.name : `${item.name} (${item.year.toString()})`}
              image={item.image}
              price={item.price}
              likeButton={<ButtonLike isLiked={item.is_favorite} />}
            />
          ))}
        </ListSection>
      )}
    </>
  )
};

export default ArtistPageContent;