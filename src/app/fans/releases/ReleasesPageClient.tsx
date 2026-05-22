"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getPurchasedReleases, type FanProductCardData } from "@/api/store";
import { ProductCard } from "@/entities";
import { DownloadIcon } from "@/shared/ui/icons/downloadIcon";
import styles from "./releasesPageClient.module.scss";

function DownloadButton({ href }: { href?: string | null }) {
  if (!href) {
    return (
      <button
        type="button"
        className={styles.downloadButton}
        aria-label="Файл релиза недоступен"
        disabled
      >
        <DownloadIcon />
      </button>
    );
  }

  return (
    <a
      className={styles.downloadButton}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Скачать релиз"
    >
      <DownloadIcon />
    </a>
  );
}

export function ReleasesPageClient() {
  const { status } = useSession();
  const [cards, setCards] = useState<FanProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    let isCurrentRequest = true;

    const loadReleases = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const releaseCards = await getPurchasedReleases();

        if (isCurrentRequest) {
          setCards(releaseCards);
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setErrorMessage(
            requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить релизы",
          );
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    void loadReleases();

    return () => {
      isCurrentRequest = false;
    };
  }, [status]);

  if (status !== "authenticated" || isLoading) {
    return <p className={styles.stateMessage}>Загрузка релизов...</p>;
  }

  if (errorMessage) {
    return <p className={styles.stateMessage}>{errorMessage}</p>;
  }

  if (cards.length === 0) {
    return <p className={styles.stateMessage}>Купленных релизов пока нет</p>;
  }

  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <ProductCard
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          actionButton={<DownloadButton href={card.downloadUrl} />}
        />
      ))}
    </div>
  );
}
