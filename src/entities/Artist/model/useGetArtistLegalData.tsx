import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getArtistLegalData } from "../store/api";
import { type TArtistLegalData } from "../store/types";

export function useGetArtistLegalData() {
  const { status } = useSession();

  const isSessionLoading = status === "loading";

  return useQuery<Partial<TArtistLegalData>>({
    queryKey: ["artist-legal-data"],
    queryFn: () => getArtistLegalData(),
    enabled: !isSessionLoading,
    refetchOnWindowFocus: false,
  });
}
