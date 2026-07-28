import { UseFormSetValue } from "react-hook-form";

type AlbumFormValues = {
  name: string;
  releaseDate: string;
  genre: string;
  price: number;
  allowHigherPrice: boolean;
  description?: string;
  privacy: 'public' | 'link_only' | 'hidden';
  mainImage?: File;
  additionalImages?: Record<string, File>;
};

export type AddImageBlockProps = {
  severalImages?: boolean;
  setValue: UseFormSetValue<AlbumFormValues>;
};