"use client";

import { ReleaseDescription, TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";
import s from "./ReleasePageContent.module.scss";
import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import { Track } from "@/shared/ui/Track";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ListSection, Title } from "@/shared/ui";
import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";

interface ReleasePageContentProps {
  release: TDetailRelease;
  selected: string | undefined;
}

const ReleasePageContent = ({release, selected}: ReleasePageContentProps) => {

  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const tracksQuery = useQuery({ 
    queryKey: ['tracks', release.id], 
    queryFn: () => getTracksList({
      albumId: release.id
    }),
    enabled: !release.is_single,
    refetchOnWindowFocus: false,
  });

  const recomQuery = useQuery({ 
      queryKey: ['recom', 'album'], 
      queryFn: () => getCatalogList({
        type: 'album',
        ordering: 'random',
        limit: "4"
      }),
      refetchOnWindowFocus: false,
    });

  const tracks = tracksQuery.data?.results;
  const recommendations = recomQuery.data?.results;

  const handlePlay = (id: number) => {

    if (id === playingTrack) {
      setPlayingTrack(null)
    } else {
      setPlayingTrack(id);
    }
  };

  const handleAddtoCart = () => {
    console.log('Добавить в корзину')
  };

  const handleLike = () => {
    console.log('Лайк')
  };

  return (
    <>
      <ReleaseDescription release={release} selected_variant_id={selected}/>

      {tracksQuery.isLoading && (
        <div>Загрузка треков...</div>
      )}

      {!release.is_single && tracks && tracks.length > 0 && (
        <section className={s.tracksSection}>
          <Title className={s.title}>Плеер</Title>
          <div className={s.tracksContainer}>
            {tracks.map(track => {
              return (
                <Track 
                  key={track.id}
                  title={track.name}
                  artistName={track.artist_name || ''}
                  image={track.image}
                  isLiked={track.is_favorite}
                  isPlaying={playingTrack === track.id}
                  onPlayClick={() => handlePlay(track.id)}
                  onCartClick={handleAddtoCart}
                  onLikeClick={handleLike}
                />
              )
            })}
          </div>
        </section>
      )}
      <Suspense fallback={<div>Загрузка рекомендаций...</div>}>
        {recommendations && (
          <ListSection title="Вам также может понравиться" link={`/catalog/album`}>
            {recommendations.map(item => {
              const url = item.target.url;
              const match = url.match(/(\d+)\/$/);
              const id = match ? match[1] : null;
              const selected = item.target.selected_variant_id !== null ? item.target.selected_variant_id : undefined
              return (
                <ProductCard 
                  key={item.product_id}
                  title={item.artist_name}
                  description={item.year === null ? item.name : `${item.name} (${item.year.toString()})`}
                  image={item.image}
                  price={item.price}
                  likeButton={<ButtonLike isLiked={item.is_favorite} />}
                  link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
                />
            )})}
          </ListSection>
        )}
      </Suspense>
    </>
  )
};

export default ReleasePageContent;