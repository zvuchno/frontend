import { TGenreKind } from "@/api/genresKinds/genresKindsApi.types";
import { TMerchKind } from "@/api/merchKinds/merchKindsApi.types";

export interface FilterBlockProps {
  сategory: string;
  basePath: string;
  genresList: TGenreKind[];
  merchList?: TMerchKind[];
}

export type TCategory = 'all' | 'artists' | 'albums' | 'merch'