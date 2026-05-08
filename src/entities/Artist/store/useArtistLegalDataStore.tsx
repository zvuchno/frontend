import { create } from "zustand";
import { TArtistLegalData } from "./types";
import { getArtistLegalData, updateArtistLegalData } from "./api";

export interface ArtistLegalDataStoreProps {
  artistLegalData: Partial<TArtistLegalData> | null;
  isLoading: boolean;
  error: string | null;

  fetchArtistLegalData: () => Promise<void>;
  updateArtistLegalData: (data: Partial<TArtistLegalData>) => Promise<void>;

  setArtistLegalData: (
    artistLegalData: Partial<TArtistLegalData> | null,
  ) => void;

  clearStore: () => void;
}

export const useArtistLegalDataStore = create<ArtistLegalDataStoreProps>()(
  (set) => ({
    artistLegalData: null,
    isLoading: false,
    error: null,

    setArtistLegalData: (legalData) => set({ artistLegalData: legalData }),

    fetchArtistLegalData: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await getArtistLegalData();
        set({ artistLegalData: data, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    updateArtistLegalData: async (newData) => {
      set({ isLoading: true, error: null });
      try {
        const updatedData = await updateArtistLegalData(newData);
        set((state) => ({
          artistLegalData: state.artistLegalData
            ? { ...state.artistLegalData, ...updatedData }
            : updatedData,
          isLoading: false,
        }));
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
        throw error;
      }
    },

    clearStore: () =>
      set({
        artistLegalData: null,
        isLoading: false,
        error: null,
      }),
  }),
);
