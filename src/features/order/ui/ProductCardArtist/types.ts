import type { ComponentPropsWithoutRef } from "react";

export type ProductCardArtistAttribute = {
  label: string;
  value: string;
};

export type ProductCardArtistProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children" | "title"
> & {
  image?: string;
  title?: string;
  quantity?: number;
  attributes?: ProductCardArtistAttribute[];
};
