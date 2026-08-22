import { useMutation, useQuery } from "@tanstack/react-query";

import { createPVZMe, deletePVZMe, receivePVZMe } from "../api/artistSettings.api";
import { type TPVZOfficeMe } from "./artistSettings.types";

export function useGetArtistPvzOffice() {
  return useQuery<TPVZOfficeMe | null>({
    queryKey: ["artist-pvz"],
    queryFn: () => receivePVZMe(),
    refetchOnWindowFocus: false,
  });
}

export function useCreateArtistPvzOffice() {
  return useMutation<TPVZOfficeMe, Error, TPVZOfficeMe>({
    mutationFn: (pvz: TPVZOfficeMe) => createPVZMe(pvz),
  });
}

export function useDeleteArtistPvzOffice() {
  return useMutation<void, Error, void>({
    mutationFn: () => deletePVZMe(),
  });
}
