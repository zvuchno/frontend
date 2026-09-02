"use client";

import { useState } from "react";

import { type PurchasedReleases, getDownloadOptions, getPurchasedReleases } from "@/api/store";
import {
  type PaginatedStoreResponse,
  type PurchasedReleaseDownloadOptions,
} from "@/api/store/types";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { ProductCard } from "@/entities/ProductCard";

import { Loader } from "@/shared/ui";
import { DownloadIcon } from "@/shared/ui/Icons";

import { DownloadReleaseModal } from "../components/DownloadReleaseModal/DownloadReleaseModal";
import styles from "./releasesPageClient.module.scss";
import { usePlayerStore } from "@/features/player";
import { getTracksList } from "@/api/catalog/tracksListApi/getTracksList";
import toast from "react-hot-toast";

export function ReleasesPageClient() {
  const { status } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Состояние для данных скачивания
  const [downloadData, setDownloadData] = useState<PurchasedReleaseDownloadOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorDownload, setErrorDownload] = useState<string | null>(null);

  const { playingAlbumId, togglePlay, playAlbum, setPlayingAlbumId } = usePlayerStore();

  const { data, error, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<
      PaginatedStoreResponse<PurchasedReleases>,
      Error,
      InfiniteData<PaginatedStoreResponse<PurchasedReleases>>
    >({
      queryKey: ["listener", "releases"],
      queryFn: async ({ pageParam }) => {
        const url = pageParam as string | undefined;
        if (url) return getPurchasedReleases(url);
        return getPurchasedReleases();
      },
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage?.next,
      staleTime: 5 * 60 * 1000
    });

  const cards = data?.pages.flatMap((page) => page.results) ?? [];

  const handleDownloadClick = async (e: React.MouseEvent, albumId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setLoading(true);
    setErrorDownload(null);
    setDownloadData(null);

    try {
      const data = await getDownloadOptions(albumId);
      setDownloadData(data);
    } catch (err) {
      setErrorDownload(
        err instanceof Error ? err.message : "Не удалось получить варианты скачивания"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePlayRelease = async (releaseId: number) => {
    if (playingAlbumId === releaseId) {
      togglePlay();
      return;
    }
    
    try {
      const data = await getTracksList({ albumId: releaseId });
      const tracks = data?.tracks;
      if (!tracks?.length) return;
      playAlbum(tracks, 0);
      setPlayingAlbumId(releaseId);
    } catch (err) {
      console.error('Не удалось загрузить треки релиза', err);
      toast.error("Не удалось загрузить треки релиза")
    }
  };

  if (status !== "authenticated" || isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.stateMessage}>{error.message}</p>;
  }

  if (cards.length === 0) {
    return <p className={styles.stateMessage}>Купленных релизов пока нет</p>;
  }

  return (
    <div className={styles.container}>
      {cards.map((card) => {
        return (
          <ProductCard
            key={card.id}
            image={card.image}
            title={card.artist_name}
            description={
              card.year === null
                ? `${card.kind} ${card.name}`
                : `${card.kind} ${card.name} (${card.year.toString()})`
            }
            actionButton={
              <button
                type='button'
                className={styles.downloadButton}
                aria-label='Скачать релиз'
                onClick={(e) => void handleDownloadClick(e, card.id)}
                disabled={loading}
              >
                <DownloadIcon />
              </button>
            }
            link={`/catalog/release/${card.id}?kind=release`}
            isRelease
            isPlaying={playingAlbumId === card.id}
            onPlay={() => handlePlayRelease(card.id)}
          />
        );
      })}
      {hasNextPage && (
        <div className={styles.buttonWrapper}>
          <button
            type='button'
            className={styles.button}
            onClick={() => {
              fetchNextPage().catch(console.error);
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "загрузка..." : "смотреть ещё"}
          </button>
        </div>
      )}
      <DownloadReleaseModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setDownloadData(null);
          setErrorDownload(null);
        }}
        loading={loading}
        error={errorDownload}
        data={downloadData}
      />
    </div>
  );
}
