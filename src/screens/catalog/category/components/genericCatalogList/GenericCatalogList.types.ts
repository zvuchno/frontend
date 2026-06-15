export interface CatalogListProps {
  category: 'album' | 'all' | 'merch' | 'artists';
  filterByGenre?: string | string[];
  filterBySubcategory?: string | string[];
  filterByArtist?: string;
  orderingFilter?: '-created_at' | 'random';
  offset?: string;
}