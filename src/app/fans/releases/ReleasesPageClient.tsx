"use client";

import { ProductCard } from "@/entities";
import styles from "./releasesPageClient.module.scss";

export function ReleasesPageClient() {
  const mockCards = [
    {
      id: 1,
      image: "/cassette.png",
      title: "Окна",
      description: "Кассета ОДИН МАНУЛ (LP, 2025)",
    },
    {
      id: 2,
      image: "/shirt.png",
      title: "JEW3SS",
      description: "Футболка ВЫХИНО (2025)",
    },
    {
      id: 3,
      image: "/earpieces.png",
      title: "ДОКТОР АЛЕКСАНДРОВ",
      description: "Сингл STOP NARKOTICS (2025)",
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
        />
      ))}
    </div>
  );
}
