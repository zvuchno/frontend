import type { ComponentPropsWithoutRef } from "react";

export type TOrderCardListenerProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children"
> & {
  orderNumber: string | number;
  itemsCount: number;
  totalPrice: string | number;
  previewImages: readonly string[];
  onDetailsClick: () => void;
};
