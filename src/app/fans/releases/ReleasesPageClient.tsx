"use client";

import { ProductCard } from "@/entities";
import { DownloadIcon } from "@/shared/ui/icons/downloadIcon";
import styles from "./releasesPageClient.module.scss";

function DownloadButton() {
  return (
    <button
      type="button"
      className={styles.downloadButton}
      aria-label="Скачать релиз"
    >
      <DownloadIcon />
    </button>
  );
}

export function ReleasesPageClient() {
  const mockCards = [
    {
      id: 1,
      image: "/favorite-cassette.png",
      title: "Окна",
      description: "Кассета ОДИН МАНУЛ (LP, 2025)",
    },
    {
      id: 2,
      image: "/favorite-cassette.png",
      title: "Окна",
      description: "Кассета ОДИН МАНУЛ (LP, 2025)",
    },
    {
      id: 3,
      image: "/favorite-cassette.png",
      title: "Окна",
      description: "Кассета ОДИН МАНУЛ (LP, 2025)",
    },
  ];

  return (
    <div className={styles.container}>
      {mockCards.map((card) => (
        <ProductCard
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          actionButton={<DownloadButton />}
        />
      ))}
    </div>
  );
}
