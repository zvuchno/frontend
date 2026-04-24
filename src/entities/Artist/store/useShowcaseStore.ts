import { create, StateCreator } from "zustand";

export type TProduct = {
  id: number;
  image: string | null;
  name: string;
  article: string;
  price: string;
  amount: string;
  visibility: boolean;
};

export type TPromoCode = {
  id: number;
  name: string;
  discount: string;
  period: string;
  amount: string;
  visibility: boolean;
}

interface IActions {
  toggleVisibilityProduct: (value: boolean, id: number) => void;
  deleteProduct: (id: number) => void;
  toggleVisibilityPromo: (value: boolean, id: number) => void;
  deletePromo: (id: number) => void;
}

interface IInitialState {
  products: TProduct[];
  promoCodes: TPromoCode[];
};

interface IShowcaseState extends IInitialState, IActions {};

const initialState: IInitialState = {
  products: [],
  promoCodes: [],
};

const showcaseStore: StateCreator<IShowcaseState> = (set) => ({
  ...initialState,
  toggleVisibilityProduct: (value: boolean, id: number) => {
    set((state) => ({
      products: state.products.map(product => product.id === id ? { ...product, visibility: value} : product)
    }));
  },
  deleteProduct: (id: number) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    }));
  },
  toggleVisibilityPromo: (value: boolean, id: number) => {
    set((state) => ({
      promoCodes: state.promoCodes.map(promo => promo.id === id ? { ...promo, visibility: value} : promo)
    }));
  },
  deletePromo: (id: number) => {
    set((state) => ({
      promoCodes: state.promoCodes.filter(promo => promo.id !== id)
    }));
  },
})

const useShowcaseStore = create<IShowcaseState>()(showcaseStore);

// Селекторы для продуктов
export const useShowcaseProducts = () => useShowcaseStore((state) => state.products);
export const useToggleVisibilityProduct = (value: boolean, id: number) => useShowcaseStore.getState().toggleVisibilityProduct(value, id);
export const useDeleteProduct = (id: number) => useShowcaseStore.getState().deleteProduct(id);

//Селекторы для промокодов
export const useShowcasePromoCodes = () => useShowcaseStore((state) => state.promoCodes);
export const useToggleVisibilityPromo = (value: boolean, id: number) => useShowcaseStore.getState().toggleVisibilityPromo(value, id);
export const useDeletePromo = (id: number) => useShowcaseStore.getState().deletePromo(id);