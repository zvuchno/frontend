import type { FC } from "react";

import type { ProductCardArtistProps } from "./types";

export const ProductCardArtist: FC<ProductCardArtistProps> = ({
  className,
  id,
  image,
  definitions,
  ...articleProps
}) => {
  const primaryDefinition = definitions[0];

  void image;

  return (
    <article
      className={className}
      data-product-id={id}
      aria-label={String(primaryDefinition.value)}
      {...articleProps}
    />
  );
};
