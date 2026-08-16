import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getRecipientTypes } from "../store/api";

export function useGetRecipientTypes() {
  const { status } = useSession();

  const isSessionLoading = status === "loading";

  return useQuery<unknown>({
    queryKey: ["recipient-types"],
    queryFn: () => getRecipientTypes(),
    enabled: !isSessionLoading,
    refetchOnWindowFocus: false,
  });
}
