import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { getCheckoutData } from "../api/order.api";
import type { TCheckoutData } from "./types";

export function useGetCheckoutData() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const isAuthorized = !!token;

  return useQuery<TCheckoutData>({
    queryKey: ["checkout-data", isAuthorized],
    queryFn: getCheckoutData.bind(null, token),
    enabled: !!token,
  });
}
