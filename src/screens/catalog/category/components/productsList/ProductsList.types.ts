import { type TArtistCard } from "@/api/catalog/artistsListApi/types";
import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";

export interface ProductsListProps {
  category: 'album' | 'all' | 'merch' | 'artists';
  filterByGenre?: string | string[];
  filterBySubcategory?: string | string[];
  filterByArtist?: string;
  orderingFilter?: '-created_at' | 'random';
  offset?: string;
  search?: string;
}

export interface ProductsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: [];
}

export const isProductCard = (card: TCatalogCard | TArtistCard): card is TCatalogCard => {
  return "kind" in card;
};

export const isArtistCard = (card: TCatalogCard | TArtistCard): card is TArtistCard => {
  return "slug" in card;
};
