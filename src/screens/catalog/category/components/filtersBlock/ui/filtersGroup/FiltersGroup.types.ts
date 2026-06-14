type TItem = {
  name: string;
  slug: string;
}

export interface FiltersGroupProps {
  items: TItem[];
  filterType?: string;
  title?: string;
  isSecondary?: boolean;
  isClearFilters?: boolean; 
  isActiveFilter: (value: string) => boolean;
  buildLink?: (filter: string, value: string) => void;
  clearFilters?: () => void;
}