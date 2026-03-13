import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type TProductCardImage = {
  src: string;
  alt: string;
};

export type TProductCardProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children" | "title"
> & {
  image: TProductCardImage;
  title: string;
  description: string;
  price: string;
  likeButton?: ReactNode;
};
