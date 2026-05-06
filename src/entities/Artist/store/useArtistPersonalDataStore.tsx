import {
  TPassportData,
  TPaymentData,
} from "@/features/artist/ui/FormPersonal/utils/types";
import { create } from "zustand";

export interface ArtistLegalDataProps {
  artistType: "individual" | "legalEntity";
  companyName?: string;
  legalAdress?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: Date | null;
  email?: string;
  phone?: string;
  adress?: string;
  passport?: TPassportData;
  paymentDetails?: TPaymentData;
}

export interface ArtistLegalDataStoreProps {
  artistPersonalData: Partial<ArtistLegalDataProps> | null;
  isLoading: boolean;
  error: string | null;

  setArtistPersonalData: (
    artistPersonalData: Partial<ArtistLegalDataProps> | null,
  ) => void;
  setIsLoading: (load: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;

  updateArtistPersonalData: (data: Partial<ArtistLegalDataProps>) => void;
}

export const useArtistPersonalDataStore = create<ArtistLegalDataStoreProps>()(
  (set) => ({
    artistPersonalData: null,
    isLoading: false,
    error: null,

    setArtistPersonalData: (artistPersonalData) => set({ artistPersonalData }),
    setIsLoading: (load) => set({ isLoading: load }),
    setError: (error) => set({ error: error }),
    updateArtistPersonalData: (newData) =>
      set((state) => ({
        artistPersonalData: state.artistPersonalData
          ? { ...state.artistPersonalData, ...newData }
          : (newData as ArtistLegalDataProps),
      })),

    clearStore: () =>
      set({
        artistPersonalData: null,
        isLoading: false,
        error: null,
      }),
  }),
);
