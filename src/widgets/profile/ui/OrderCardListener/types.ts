import type { ComponentPropsWithoutRef } from "react";

export type TOrderCardListenerPreviewItem = {
  id: string | number;
  src: string;
  title: string;
};

export type TOrderCardListenerProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children"
> & {
  orderId: string | number;
  orderNumber: number;
  itemsCount: number;
  totalPrice: number;
  previewItems: readonly TOrderCardListenerPreviewItem[];
  onDetailsClick: () => void;
};
