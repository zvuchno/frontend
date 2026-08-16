import { useMutation } from "@tanstack/react-query";

import { updateArtistLegalData } from "../store/api";
import { type TArtistLegalData, type TArtistLegalDataForApi } from "../store/types";

export function useUpdateArtistLegalData() {
  return useMutation<Partial<TArtistLegalData>, Error, TArtistLegalDataForApi>({
    mutationFn: (data) => updateArtistLegalData(data),
  });
}
