import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { useRecentlyViewedProps } from "../model/types";

export const useRecentlyViewed = create<useRecentlyViewedProps>()(
  persist(
    (set) => ({
      viewedProducts: [],

      addProduct: (product) => {
        set((state) => {
          const currentProducts = state.viewedProducts.filter(
            (item) => item.product_id !== product.product_id
          );
          return { viewedProducts: [product, ...currentProducts] };
        });
      },

      clearProducts: () => set({ viewedProducts: [] }),
    }),
    {
      name: "recently-viewed-products",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
