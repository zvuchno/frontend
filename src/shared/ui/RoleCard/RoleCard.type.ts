import { type StaticImageData } from "next/image";

type ImageSource = string | StaticImageData | { src: string };

export interface RoleCardProps {
  path: string;
  image: ImageSource;
  title: string;
  description?: string;
  cardClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
};