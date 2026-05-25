type TItem = {
  name: string;
  slug: string;
}

export interface FiltersGroupProps {
  items: TItem[];
  title?: string;
  isSecondary?: boolean;
  isActiveFilter: (value: string) => boolean;
  onClick?: (value: string) => void;
  buildLink?: (value: string) => string;
}