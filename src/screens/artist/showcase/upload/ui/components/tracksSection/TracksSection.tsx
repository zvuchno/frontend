"use client";

import { useTracksInfiniteQuery } from "@/entities/Artist";
import { ButtonUI, Text, Title } from "@/shared/ui";
import { ShowcaseTrackList } from "@/widgets/ShowcaseTrackList";
import s from "./TracksSection.module.scss";

type TracksSectionProps = {
  releaseId: number | null;
  isSubmitting: boolean;
  releaseType?: "album" | "ep" | "single";
  onUploadTrack: () => void;
  onEditTrack: (id: number) => void;
  onChangeTracksOrder: (ids: number[]) => void;
  onDeleteTrack: (id: number) => void;
};

export const TracksSection = ({ 
  releaseId, 
  isSubmitting,
  releaseType,
  onUploadTrack, 
  onEditTrack,
  onChangeTracksOrder,
  onDeleteTrack
}: TracksSectionProps) => {

  const {
    data: tracks,
    error: tracksError,
    fetchNextPage,
    isLoading: tracksLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useTracksInfiniteQuery("release", releaseId);
  const tracksList = tracks?.pages.flatMap((page) => page.results) ?? [];

  const handleDeleteTrack = async (id: number) => {
    onDeleteTrack(id);
  };

  const handleOnUploadTrackClick = () => {
    onUploadTrack();
  };

  const handleOnEditClick = (id: number) => {
    onEditTrack(id);
  };

  const handleOnChangeTracksOrder = (ids: number[]) => {
    onChangeTracksOrder(ids);
  };

  return (
    <section className={s.uploadContainer}>
      <Title Tag="h4" className={s.uploadContainer__title}>Загрузка трека</Title>
      <Text className={s.uploadContainer__hint}>
        Загрузите трек с устройства (максимальный размер 500 MB; MP3, WAV, FLAC)
      </Text>
      {(releaseType === "single" && tracksList.length === 0) || releaseType !== "single" && (
        <ButtonUI
          variant='primary'
          type='button'
          onClick={handleOnUploadTrackClick}
          disabled={isSubmitting}
          className={s.uploadContainer__uploadButton}
        >
          Загрузить трек
        </ButtonUI>
      )}

      <div className={s.uploadContainer__list}>
        <ShowcaseTrackList 
          tracksList={tracksList} 
          tracksError={tracksError}
          isLoading={tracksLoading}
          isFetching={isFetchingNextPage}
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          onDeleteTrack={handleDeleteTrack}
          onEditTrack={handleOnEditClick}
          onOrderChange={handleOnChangeTracksOrder}
        />
      </div>
    </section>
  )
}