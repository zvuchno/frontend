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
import { AddToCartModal, TDataForModal } from "@/features/addToCartModal";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ReleasePageContentProps {
  release: TDetailRelease;
  selected: string | undefined;
}

const ReleasePageContent = ({release, selected}: ReleasePageContentProps) => {

  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataForModal, setDataForModl] = useState<TDataForModal | null>(null);

  const tracksQuery = useQuery({ 
    queryKey: ['tracks', release.id], 
    queryFn: () => getTracksList({
      albumId: release.id
    }),
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

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handlePlay = (id: number) => {

    if (id === playingTrack) {
      setPlayingTrack(null)
    } else {
      setPlayingTrack(id);
    }
  };

  const handleOpenAddtoCartModal = (data: TDataForModal) => {
    if (!isAuthorized) {
      const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;
      router.push(`/signin?next=${encodeURIComponent(currentUrl)}`);

    } else {
      setDataForModl(data);
      setIsModalOpen(true);
    }
  };

  const handleLike = () => {
    console.log('Лайк')
  };

  return (
    <>
      <ReleaseDescription release={release} selected_variant_id={selected} onClick={handleOpenAddtoCartModal}/>

      {tracksQuery.isLoading && (
        <div>Загрузка треков...</div>
      )}

      {tracks && tracks.length > 0 && (
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
                  hasCart={!!track.price}
                  onPlayClick={() => handlePlay(track.id)}
                  onCartClick={() => handleOpenAddtoCartModal({
                    product_variant: track.id,
                    type: 'Трек',
                    name: `"${track.name}"`,
                    image: track.image,
                    price: track.price,
                    allow_overpay: track.allow_overpay,
                  })}
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
      </Suspense>

      {dataForModal && (
        <AddToCartModal isOpen={isModalOpen} data={dataForModal} onClose={handleClose}/>
      )}
    </>
  )
};

export default ReleasePageContent;