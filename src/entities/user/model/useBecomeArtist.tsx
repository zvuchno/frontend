import { useMutation } from "@tanstack/react-query";

import { type TBecomeArtistRequest } from "@/widgets/auth/BecomeArtistForm";

import { fanBecomeArtist } from "../api/api";

export function useBecomeArtist() {
  return useMutation<TBecomeArtistRequest, Error, TBecomeArtistRequest>({
    mutationFn: ({ name, profile_type }: TBecomeArtistRequest) =>
      fanBecomeArtist(name, profile_type),
  });
}
