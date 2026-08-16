import { useQuery } from "@tanstack/react-query";

import { getCheckoutData } from "../api/order.api";
import type { TCheckoutData } from "./types";

export function useGetCheckoutData() {
  return useQuery<TCheckoutData>({
    queryKey: ["checkout-data"],
    queryFn: getCheckoutData.bind(null),
    refetchOnWindowFocus: false,
  });
}
