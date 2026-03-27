import type { ComponentPropsWithoutRef } from "react";
import type { DefinitionProps } from "@/shared/ui/definition";

export type ProductCardArtistDefinition = DefinitionProps;
export type ProductCardArtistDefinitions = [
  ProductCardArtistDefinition,
  ...ProductCardArtistDefinition[],
];

export type ProductCardArtistData = {
  id: string;
  image: string;
  definitions: ProductCardArtistDefinitions;
};

export type ProductCardArtistProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children" | "id"
> &
  ProductCardArtistData;
