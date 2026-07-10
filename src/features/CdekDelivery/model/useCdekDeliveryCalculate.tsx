import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { calculateCdekDelivery } from "../api/cdek.api";
import type { TCdekData, TCdekPickupDetailsResponse } from "./types";

export function useCdekCalculate() {
  const queryClient = useQueryClient();

  return useMutation<TCdekPickupDetailsResponse, Error, TCdekData>({
    mutationFn: (data: TCdekData) => calculateCdekDelivery(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["delivery"], data);
    },
    onError: (error) => {
      toast.success(`Ошибка: ${error.message}`);
    },
  });
}
