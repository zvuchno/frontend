"use client";

import { useMemo, useState } from "react";

import { ArtistProfileEditModeContext } from "./ArtistProfileEditModeContext";

export const ArtistProfileEditModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const value = useMemo(() => ({ isEditMode, setIsEditMode }), [isEditMode]);

  return (
    <ArtistProfileEditModeContext.Provider value={value}>
      {children}
    </ArtistProfileEditModeContext.Provider>
  );
};
