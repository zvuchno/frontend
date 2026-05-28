export interface CatalogListProps {
  category: string;
  filterByGenre?: string | string[];
  filterBySubcategory?: string | string[];
  orderingFilter?: string;
  offset?: string;
}