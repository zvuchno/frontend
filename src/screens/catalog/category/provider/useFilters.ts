"use client";

import { useContext } from "react";
import { FiltersContext } from "./FiltersProvider";

export function useFilters() {
  const context = useContext(FiltersContext);

  if (context === undefined) {
    throw new Error('useFilters must be used inside a FiltersProvider');
  }

  return context;
};