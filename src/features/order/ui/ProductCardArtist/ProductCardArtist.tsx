import type { FC } from "react";

import type { ProductCardArtistProps } from "./types";

export const ProductCardArtist: FC<ProductCardArtistProps> = ({
  className,
  ...articleProps
}) => <article className={className} {...articleProps} />;
