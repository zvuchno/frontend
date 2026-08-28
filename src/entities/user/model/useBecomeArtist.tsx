import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type TBecomeArtistRequest } from "@/widgets/auth/BecomeArtistForm";

import { fanBecomeArtist } from "../api/api";

export function useBecomeArtist() {
  const queryClient = useQueryClient();

  return useMutation<{ name: string; profile_type: "artist" | "label" }, Error, TBecomeArtistRequest>({
    mutationFn: (data: TBecomeArtistRequest) =>
      fanBecomeArtist(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentArtist", "profile"],
        refetchType: "all",
      });
    },
  });
}
