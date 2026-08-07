import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getRecipientTypes } from "../store/api";

export function useGetRecipientTypes() {
  const { data: session, status } = useSession();
  const token = session?.user.accessToken;
  const isSessionLoading = status === "loading";

  return useQuery<unknown>({
    queryKey: ["recipient-types", { isAuthorized: !!token }],
    queryFn: () => getRecipientTypes(token),
    enabled: !isSessionLoading && !!token,
  });
}
