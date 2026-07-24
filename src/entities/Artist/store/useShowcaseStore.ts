import { create, type StateCreator } from "zustand";

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
  setArtist: (atrist: string | null) => void;
  toggleVisibilityProduct: (value: boolean, id: number) => void;
  deleteProduct: (id: number) => void;
  toggleVisibilityPromo: (value: boolean, id: number) => void;
  deletePromo: (id: number) => void;
}

interface IInitialState {
  artist: string | null;
  products: TProduct[];
  promoCodes: TPromoCode[];
};

interface IShowcaseState extends IInitialState, IActions {};

const initialState: IInitialState = {
  artist: null,
  products: [],
  promoCodes: [],
};

const showcaseStore: StateCreator<IShowcaseState> = (set) => ({
  ...initialState,
  setArtist: (artist: string | null) => {
    set({ artist });
  },
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

// Селектор для получения артиста
export const useShowcaseArtist = () =>
  useShowcaseStore((state) => state.artist);

// Селектор для установки артиста 
export const useSetArtist = () =>
  useShowcaseStore((state) => state.setArtist);

// Селекторы для продуктов
export const useShowcaseProducts = () => useShowcaseStore((state) => state.products);
export const useToggleVisibilityProduct = () => useShowcaseStore((s) => s.toggleVisibilityProduct);
export const useDeleteProduct = () => useShowcaseStore((s) => s.deleteProduct);

//Селекторы для промокодов
export const useShowcasePromoCodes = () => useShowcaseStore((state) => state.promoCodes);
export const useToggleVisibilityPromo = () => useShowcaseStore((s) => s.toggleVisibilityPromo);
export const useDeletePromo = () => useShowcaseStore((s) => s.deletePromo);