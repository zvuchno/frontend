import type { ComponentPropsWithoutRef } from "react";

export type TOrderCardListenerPreviewItem = {
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
  previewItems: readonly TOrderCardListenerPreviewItem[];
  onDetailsClick: () => void;
};
