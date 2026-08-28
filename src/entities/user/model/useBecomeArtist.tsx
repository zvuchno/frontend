import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type TBecomeArtistRequest } from "@/widgets/auth/BecomeArtistForm";

import { fanBecomeArtist } from "../api/api";

export function useBecomeArtist() {
  const queryClient = useQueryClient();

  return useMutation<TBecomeArtistRequest, Error, TBecomeArtistRequest>({
    mutationFn: ({ name, profile_type }: TBecomeArtistRequest) =>
      fanBecomeArtist(name, profile_type),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentArtist", "profile"],
        refetchType: "all",
      });
    },
  });
}
