"use client";

import { useState } from "react";

import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import { useQuery } from "@tanstack/react-query";

import {
  ReleaseDescription,
  type TDetailRelease,
} from "@/widgets/ProductDetailCard/ReleaseDescription";
import { RecomendationsList } from "@/widgets/RecomendationsList";

import { AddToCartModal, type TDataForModal } from "@/features/addToCartModal";

import { Title } from "@/shared/ui";
import { Track } from "@/shared/ui/Track";

import s from "./ReleasePageContent.module.scss";

interface ReleasePageContentProps {
  release: TDetailRelease;
  selected: string | undefined;
}

const ReleasePageContent = ({ release, selected }: ReleasePageContentProps) => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataForModal, setDataForModl] = useState<TDataForModal | null>(null);

  const tracksQuery = useQuery({
    queryKey: ["tracks", release.id],
    queryFn: () =>
      getTracksList({
        albumId: release.id,
      }),
    refetchOnWindowFocus: false,
  });

  const tracks = tracksQuery.data?.results;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handlePlay = (id: number) => {
    if (id === playingTrack) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(id);
    }
  };

  const handleOpenAddtoCartModal = (data: TDataForModal) => {
    setDataForModl(data);
    setIsModalOpen(true);
  };

  const handleLike = () => {
    console.log("Лайк");
  };

  return (
    <>
      <ReleaseDescription
        release={release}
        selected_variant_id={selected}
        onClick={handleOpenAddtoCartModal}
      />

      {tracksQuery.isLoading && <div>Загрузка треков...</div>}

      {tracks && tracks.length > 0 && (
        <section className={s.tracksSection}>
          <Title className={s.title}>Плеер</Title>
          <div className={s.tracksContainer}>
            {tracks.map((track) => {
              return (
                <Track
                  key={track.id}
                  title={track.name}
                  artistName={track.artist_name || ""}
                  image={track.image}
                  isLiked={track.is_favorite}
                  isPlaying={playingTrack === track.id}
                  hasCart={!!track.price}
                  onPlayClick={() => handlePlay(track.id)}
                  onCartClick={() =>
                    handleOpenAddtoCartModal({
                      product_variant: track.id,
                      type: "Трек",
                      name: `"${track.name}"`,
                      image: track.image,
                      price: track.price,
                      allow_overpay: track.allow_overpay,
                    })
                  }
                  onLikeClick={handleLike}
                />
              );
            })}
          </div>
        </section>
      )}

      <RecomendationsList />

      {dataForModal && (
        <AddToCartModal isOpen={isModalOpen} data={dataForModal} onClose={handleClose} />
      )}
    </>
  );
};

export default ReleasePageContent;
