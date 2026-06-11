"use client";

import { ReleaseDescription, TDetailRelease } from "@/widgets/ProductDetailCard/ReleaseDescription";
import s from "./ReleasePageContent.module.scss";
import { getTracksListByAlbum } from "@/api/catalog/fetchTracksListByAlbum";
import { Track } from "@/shared/ui/Track";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ListSection, Title } from "@/shared/ui";
import { fetchCatalogList } from "@/api/catalog/fetchCatalog/fetchCatalog";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";

interface ReleasePageContentProps {
  release: TDetailRelease;
}

const ReleasePageContent = ({release}: ReleasePageContentProps) => {

  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  const tracksQuery = useQuery({ 
    queryKey: ['tracks', release.id], 
    queryFn: () => getTracksListByAlbum({
      albumId: release.id
    }) 
  });

  const recomQuery = useQuery({ 
      queryKey: ['recom'], 
      queryFn: () => fetchCatalogList({
        ordering: 'random',
        limit: 4
      }) 
    });

  const tracks = tracksQuery.data?.results;
  const recomendations = recomQuery.data?.results;

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
    <div className={s.page}>
      <ReleaseDescription release={release}/>
      {tracksQuery.isLoading && (
        <div>Загрузка треков</div>
      )}
      {!release.is_single && tracks && tracks.length > 0 && (
        <>
          <Title className={s.title}>Плеер</Title>
          <div className={s.tracksContainer}>
            {tracks.map(track => {
              return (
                <Track 
                  key={track.id}
                  title={track.name}
                  artistName={track.name}
                  image=""
                  isLiked={false}
                  isPlaying={playingTrack === track.id}
                  onPlayClick={() => handlePlay(track.id)}
                  onCartClick={handleAddtoCart}
                  onLikeClick={handleLike}
                />
              )
            })}
          </div>
        </>
      )}
      <Suspense fallback={<div>Загрузка рекомендаций...</div>}>
        <ListSection title="Вам может понравиться" link="">
          {recomendations && recomendations.map(item => (
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
      </Suspense>
    </div>
  )
};

export default ReleasePageContent;