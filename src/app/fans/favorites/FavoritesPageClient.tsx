"use client";

import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import styles from "./favoritesPageClient.module.scss";

export function FavoritesPageClient() {
  const mockCards = [
    {
      id: 1,
      image: "/favorite-cassette.png",
      title: "Окна",
      description: "Кассета ОДИН МАНУЛ (LP, 2025)",
      price: "1000",
    },
    {
      id: 2,
      image: "/favorite-shirt.png",
      title: "JEW3SS",
      description: "Футболка ВЫХИНО (2025)",
      price: "1000",
    },
    {
      id: 3,
      image: "/favorite-pins.png",
      title: "ДОКТОР АЛЕКСАНДРОВ",
      description: "Сингл STOP NARKOTICS (2025)",
      price: "1000",
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
          price={card.price}
          likeButton={<ButtonLike isLiked={true} />}
        />
      ))}
    </div>
  );
}
