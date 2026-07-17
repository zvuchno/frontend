"use client";

import { getDownloadOptions, getPurchasedReleases, type PurchasedReleases } from "@/api/store";
import { useSession } from "next-auth/react";

import { ProductCard } from "@/entities/ProductCard";

import { DownloadIcon } from "@/shared/ui/Icons";

import styles from "./releasesPageClient.module.scss";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type PurchasedReleaseDownloadOptions, type PaginatedStoreResponse } from "@/api/store/types";
import { Loader } from "@/shared/ui";
import { DownloadReleaseModal } from "../components/DownloadReleaseModal/DownloadReleaseModal";
import { useState } from "react";

export function ReleasesPageClient() {
  const { status, data: session } = useSession();
  const token = session?.user.accessToken;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Состояние для данных скачивания
  const [downloadData, setDownloadData] = useState<PurchasedReleaseDownloadOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorDownload, setErrorDownload] = useState<string | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    PaginatedStoreResponse<PurchasedReleases>,
    Error,
    InfiniteData<PaginatedStoreResponse<PurchasedReleases>>
  >({
    queryKey: ["listener", "releases"],
    queryFn: async ({ pageParam }) =>  {
      const url = pageParam as string | undefined;
      if (url) return getPurchasedReleases(token, url);
      return getPurchasedReleases(token);
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.next,
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
      const data = await getDownloadOptions(albumId, token);
      setDownloadData(data);
    } catch (err) {
      setErrorDownload(err instanceof Error ? err.message : 'Не удалось получить варианты скачивания');
    } finally {
      setLoading(false);
    }
  };
  
  if (status !== "authenticated" || isLoading) {
    return <Loader />
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
          link={`/catalog/release/${card.id}/?kind=${card.kind}`}
        />
      )})}
      {hasNextPage && (
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              fetchNextPage().catch(console.error)
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
};
