import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { type TBecomeArtistRequest } from "@/widgets/auth/BecomeArtistForm";

import { fanBecomeArtist } from "../api/api";

export function useBecomeArtist() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation<TBecomeArtistRequest, Error, TBecomeArtistRequest>({
    mutationFn: ({ name, profile_type }: TBecomeArtistRequest) =>
      fanBecomeArtist(name, profile_type, token),
  });
}
