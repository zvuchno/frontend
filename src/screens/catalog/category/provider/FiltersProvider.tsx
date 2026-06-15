'use client';

import { TGenreKind } from "@/api/catalog/genresKindApi/types";
import { createContext } from "react";

type FiltersContextType = {
  genresList: TGenreKind[];
};

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export function FiltersProvider ({ 
  genresList, 
  children 
}: {
  genresList: TGenreKind[],
  children: React.ReactNode
}) {

  const value = {
    genresList: genresList
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  )
};