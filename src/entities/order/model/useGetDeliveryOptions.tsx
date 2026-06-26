import { useQuery } from "@tanstack/react-query";

import { getDeliveryOptions } from "../api/order.api";
import type { TDeliveryOption } from "../api/order.api";

export function useGetDeliveryOptions() {
  return useQuery<TDeliveryOption[]>({
    queryKey: ["deliveries"],
    queryFn: getDeliveryOptions,
  });
}
