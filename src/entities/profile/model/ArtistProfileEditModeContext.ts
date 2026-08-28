import { createContext, useContext } from "react";

export type ArtistProfileEditModeContextValue = {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
};

export const ArtistProfileEditModeContext = createContext<ArtistProfileEditModeContextValue | null>(
  null
);

export const useArtistProfileEditMode = (): ArtistProfileEditModeContextValue => {
  const context = useContext(ArtistProfileEditModeContext);

  if (!context) {
    throw new Error("useArtistProfileEditMode must be used inside ArtistProfileEditModeProvider");
  }

  return { isEditMode: context.isEditMode, setIsEditMode: context.setIsEditMode };
};
