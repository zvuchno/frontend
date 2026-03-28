import type { ComponentPropsWithoutRef } from "react";
import type { DefinitionProps } from "@/shared/ui/definition";

export type ProductCardArtistVariant = "merch" | "music";
export type ProductCardArtistDefinition = DefinitionProps;
export type ProductCardArtistDefinitions = [
  ProductCardArtistDefinition,
  ...ProductCardArtistDefinition[],
];

export type ProductCardArtistData = {
  id: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  definitions: ProductCardArtistDefinitions;
  variant?: ProductCardArtistVariant;
};

export type ProductCardArtistProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children" | "id"
> &
  ProductCardArtistData;
