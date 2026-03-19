import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type TProductCardProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children" | "title"
> & {
  image: string;
  title: string;
  description: string;
  price: string;
  likeButton?: ReactNode;
};
