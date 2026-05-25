export interface CatalogListProps {
  category: string;
  searchParams: Promise<{}>;
  filter: string | string[] | undefined;
}