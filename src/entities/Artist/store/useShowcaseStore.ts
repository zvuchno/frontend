import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

type TProduct = {
  id: number;
  image: string | null;
  name: string;
  article: number;
  price: number;
  amount: number;
  visibility: boolean;
};

interface IActions {
  setProducts: (items: TProduct[]) => void;
  changeVisibility: (id: number) => void;
  deleteProduct: (id: number) => void;
}

interface IInitialState {
  products: TProduct[];
};

interface IShowcaseState extends IInitialState, IActions {};

const initialState: IInitialState = {
  products: []
};

const showcaseStore: StateCreator<IShowcaseState, [['zustand/immer', never]]> = (set) => ({
  ...initialState,
  setProducts: (items: TProduct[]) => {
    set({ products: items });
  },
  changeVisibility: (id: number) => {
    set((state) => {
      const product = state.products.find((product: TProduct) => product.id === id);

      if (product) {
        product.visibility = !product.visibility
      }
    });
  },
  deleteProduct: (id: number) => {
    set((state) => {
      const index = state.products.findIndex((product: TProduct) => product.id === id);

      if (index !== -1) {
        state.products.splice(index, 1);
      }
    });
  },
})

const useShowcaseStore = create<IShowcaseState>()(immer(showcaseStore));

export const getShowcaseProducts = useShowcaseStore((state) => state.products);
export const setShowcaseProducts = (items: TProduct[]) => useShowcaseStore.getState().setProducts(items);
export const useChangeVisibility = (id: number) => useShowcaseStore.getState().changeVisibility(id);
export const useDeleteProduct = (id: number) => useShowcaseStore.getState().deleteProduct(id);