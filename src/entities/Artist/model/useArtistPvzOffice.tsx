import { useMutation, useQuery } from "@tanstack/react-query";

import { deletePVZMe, managePVZMe, receivePVZMe } from "../api/artistSettings.api";
import { type TShippingSettings } from "./artistSettings.types";

export function useGetArtistPvzOffice() {
  return useQuery<Partial<TShippingSettings> | null>({
    queryKey: ["artist-pvz"],
    queryFn: () => receivePVZMe(),
    refetchOnWindowFocus: false,
  });
}

export function useManageArtistPvzOffice() {
  return useMutation<Partial<TShippingSettings>, Error, Partial<TShippingSettings>>({
    mutationFn: (pvzSettings: Partial<TShippingSettings>) => managePVZMe(pvzSettings),
  });
}

export function useDeleteArtistPvzOffice() {
  return useMutation<void, Error, void>({
    mutationFn: () => deletePVZMe(),
  });
}
