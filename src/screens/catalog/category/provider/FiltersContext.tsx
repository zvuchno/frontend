import { createContext } from "react";

import type { TGenreKind } from "@/api/catalog/genresKindApi/types";

type FiltersContextType = {
  genresList: TGenreKind[];
};

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);
