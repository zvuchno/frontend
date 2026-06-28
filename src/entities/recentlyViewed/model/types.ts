import type { TCatalogCard } from "@/api/catalog/catalogListApi/types";

export type useRecentlyViewedProps = {
  viewedProducts: TCatalogCard[];
  addProduct: (product: TCatalogCard) => void;
  clearProducts: () => void;
};
