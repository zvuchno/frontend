import type { FC } from "react";

import type { TProductCardProps } from "./types";

export const ProductCard: FC<TProductCardProps> = (props) => {
  const { image, title, description, price, likeButton, ...articleProps } =
    props;

  void image;
  void title;
  void description;
  void price;
  void likeButton;

  return <article {...articleProps} />;
};
