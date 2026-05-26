export interface CatalogListProps {
  category: string;
  basePath: string;
  filterByGenre?: string | string[];
  filterBySubcategory?: string | string[];
  orderingFilter?: string;
  offset?: string;
}