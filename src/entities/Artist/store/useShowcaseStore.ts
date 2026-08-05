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
  setArtistSlug: (atristSlug: string | null) => void;
  setArtistId: (atristId: number | null) => void;
  toggleVisibilityProduct: (value: boolean, id: number) => void;
  deleteProduct: (id: number) => void;
  toggleVisibilityPromo: (value: boolean, id: number) => void;
  deletePromo: (id: number) => void;
}

interface IInitialState {
  artistSlug: string | null;
  artistId: number | null;
  products: TProduct[];
  promoCodes: TPromoCode[];
};

interface IShowcaseState extends IInitialState, IActions {};

const initialState: IInitialState = {
  artistSlug: null,
  artistId: null,
  products: [],
  promoCodes: [],
};

const showcaseStore: StateCreator<IShowcaseState> = (set) => ({
  ...initialState,
  setArtistSlug: (artistSlug: string | null) => {
    set({ artistSlug });
  },
  setArtistId: (artistId: number | null) => {
    set({ artistId });
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

// Селектор для получения slug артиста
export const useShowcaseArtistSlug = () =>
  useShowcaseStore((state) => state.artistSlug);

// Селектор для установки slug артиста 
export const useSetArtistSlug = () =>
  useShowcaseStore((state) => state.setArtistSlug);

// Селектор для получения id артиста
export const useShowcaseArtistId = () =>
  useShowcaseStore((state) => state.artistId);

// Селектор для установки id артиста 
export const useSetArtistId = () =>
  useShowcaseStore((state) => state.setArtistId);

// Селекторы для товаров
export const useShowcaseProducts = () => useShowcaseStore((state) => state.products);
export const useToggleVisibilityProduct = () => useShowcaseStore((s) => s.toggleVisibilityProduct);
export const useDeleteProduct = () => useShowcaseStore((s) => s.deleteProduct);

//Селекторы для промокодов
export const useShowcasePromoCodes = () => useShowcaseStore((state) => state.promoCodes);
export const useToggleVisibilityPromo = () => useShowcaseStore((s) => s.toggleVisibilityPromo);
export const useDeletePromo = () => useShowcaseStore((s) => s.deletePromo);