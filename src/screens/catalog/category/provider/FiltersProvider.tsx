"use client";

import { type TGenreKind } from "@/api/catalog/genresKindApi/types";

import { FiltersContext } from "./FiltersContext";

export function FiltersProvider({
  genresList,
  children,
}: {
  genresList: TGenreKind[];
  children: React.ReactNode;
}) {
  const value = {
    genresList: genresList,
  };

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}
