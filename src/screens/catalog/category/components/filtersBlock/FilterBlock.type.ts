import { TGenreKind } from "@/api/catalog/genresKindApi/types";
import { TMerchKind } from "@/api/catalog/merchKindsApi/types";

export interface FilterBlockProps {
  сategory: string;
  basePath: string;
  //genresList: TGenreKind[];
  merchList?: TMerchKind[];
}

export type TCategory = 'all' | 'artists' | 'albums' | 'merch'