import { create } from "zustand";

//import { parseDateFromApi } from "@/shared/utils/formatDate";

import { getArtistLegalData, updateArtistLegalData } from "./api";
import { type TArtistLegalData, type TArtistLegalDataForApi } from "./types";

export interface ArtistLegalDataStoreProps {
  artistLegalData: Partial<TArtistLegalData> | null;
  isLoading: boolean;
  error: string | null;

  fetchArtistLegalData: () => Promise<void>;
  updateArtistLegalData: (data: TArtistLegalDataForApi) => Promise<void>;

  setArtistLegalData: (artistLegalData: Partial<TArtistLegalData> | null) => void;

  clearStore: () => void;
}

/*const parseLegalDataDate = (value: Date | string | null | undefined) => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  if (!value) {
    return undefined;
  }

  const date = parseDateFromApi(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
};*/

/*const prepareArtistLegalData = (data: Partial<TArtistLegalData>): Partial<TArtistLegalData> => ({
  ...data,
  identity_data: data.identity_data
    ? {
        ...data.identity_data,
        birth_date: parseLegalDataDate(data.identity_data.birth_date),
        passport_issue_date: parseLegalDataDate(data.identity_data.passport_issue_date),
      }
    : data.identity_data,
});*/

export const useArtistLegalDataStore = create<ArtistLegalDataStoreProps>()((set) => ({
  artistLegalData: null,
  isLoading: false,
  error: null,

  setArtistLegalData: (legalData) => set({ artistLegalData: legalData }),

  fetchArtistLegalData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getArtistLegalData();
      //const preparedData = prepareArtistLegalData(data);
      set({ artistLegalData: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateArtistLegalData: async (newData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedData = await updateArtistLegalData(newData);
      //const preparedData = prepareArtistLegalData(updatedData);
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
}));
