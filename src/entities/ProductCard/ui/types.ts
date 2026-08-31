import { TTrack } from "@/api/catalog/tracksListApi/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type TProductCardProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "children" | "title"
> & {
  image: string | null;
  title: string;
  description: string;
  price?: string | number;
  link?: string;
  actionButton?: ReactNode;
  likeButton?: ReactNode;
  isRelease?: boolean;
  isPlaying?: boolean;
  onHandleClick?: () => void;
  onPlay?: () => void;
};
