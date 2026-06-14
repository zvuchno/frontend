import { TProduct } from "@/api/catalog/fetchCategory";

export interface ProductsListProps {
  products: TProduct[];
  link: string | null
};

export interface ProductsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: []
};