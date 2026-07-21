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

import { Loader, Title } from "@/shared/ui";
import { Track } from "@/shared/ui/Track";

import s from "./ReleasePageContent.module.scss";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";
import { useSession } from "next-auth/react";

interface ReleasePageContentProps {
  release: TDetailRelease;
  selected: string | undefined;
}

const ReleasePageContent = ({ release, selected }: ReleasePageContentProps) => {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataForModal, setDataForModl] = useState<TDataForModal | null>(null);

  const { status, data: session } = useSession();
  const isAuth = status === 'authenticated';
  const token = session?.user.accessToken;
  const hasFetching = isAuth || status === 'unauthenticated';

  const tracksQuery = useQuery({
    queryKey: ["tracks", release.id],
    queryFn: () =>
      getTracksList({
        albumId: release.id,
        token,
      }),
      enabled: hasFetching,
  });

  const tracks = tracksQuery.data?.tracks;

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

  if (status === 'loading') {
    return <Loader />;
  }

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
              const variant_id = track.purchase?.variant_id;
              return (
                <Track
                  key={track.id}
                  title={track.name}
                  artistName={track.artist_name || ""}
                  image={track.image}
                  isLiked={track.is_favorite}
                  isPlaying={playingTrack === track.id}
                  hasCart={track.purchase ? true : false}
                  isAuth={isAuth}
                  onPlayClick={() => handlePlay(track.id)}
                  onCartClick={() => {
                    if (track.purchase) {
                      handleOpenAddtoCartModal({
                        product_variant: track.purchase.variant_id,
                        type: "Трек",
                        name: `${track.name}`,
                        image: track.image,
                        price: track.purchase ? track.purchase.price : '',
                        allow_overpay: track.purchase.allow_overpay,
                      })
                    }
                  }
                    
                  }
                  onLikeClick={(value) => {
                    handleToggleFavorites(value, variant_id!, token).catch(console.error)
                  }}
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
