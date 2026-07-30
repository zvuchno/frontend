import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getArtistLegalData } from "../store/api";
import { type TArtistLegalData } from "../store/types";

export function useGetArtistLegalData() {
  const { data: session, status } = useSession();
  const token = session?.user.accessToken;
  const isSessionLoading = status === "loading";
  const isAuthorized = !!token;

  return useQuery<Partial<TArtistLegalData>>({
    queryKey: ["artist-legal-data", token],
    queryFn: () => getArtistLegalData(token),
    enabled: !isSessionLoading && !isAuthorized,
  });
}
