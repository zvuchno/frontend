import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateArtistLegalData } from "../store/api";
import { type TArtistLegalData, type TArtistLegalDataForApi } from "../store/types";

export function useUpdateArtistLegalData() {
  const queryClient = useQueryClient();

  return useMutation<Partial<TArtistLegalData>, Error, TArtistLegalDataForApi>({
    mutationFn: (data) => updateArtistLegalData(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["checkList"] }),
        queryClient.invalidateQueries({ queryKey: ["artist-legal-data"] }),
      ]);
    },
  });
}
