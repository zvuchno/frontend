import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { updateArtistLegalData } from "../store/api";
import { type TArtistLegalData, type TArtistLegalDataForApi } from "../store/types";

export function useUpdateArtistLegalData() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation<Partial<TArtistLegalData>, Error, TArtistLegalDataForApi>({
    mutationFn: (data) => updateArtistLegalData(data, token),
  });
}
