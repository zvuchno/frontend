import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type CartPromoCodeProps } from "../model/types";

export const useCartPromoCode = create<CartPromoCodeProps>()(
  persist(
    (set) => ({
      promo: null,
      clearPromo: () => set({ promo: null }),
    }),
    {
      name: "current-cart-promocode",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
