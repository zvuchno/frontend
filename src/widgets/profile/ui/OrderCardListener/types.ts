import type { ComponentPropsWithoutRef } from "react";

export type TOrderCardListenerPreview = {
  src: string;
  title: string;
};

export type TOrderCardListenerProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children"
> & {
  orderNumber: number;
  itemsCount: number;
  totalPrice: number;
  previewImages: readonly TOrderCardListenerPreview[];
  onDetailsClick: () => void;
};
