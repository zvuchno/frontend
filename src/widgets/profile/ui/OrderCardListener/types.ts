import type { ComponentPropsWithoutRef } from "react";

export type TOrderCardListenerProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children"
> & {
  orderNumber?: string | number | null;
  itemsCount?: number | null;
  totalPrice?: string | number | null;
  previewImages?: readonly string[] | null;
  onDetailsClick: () => void;
};
