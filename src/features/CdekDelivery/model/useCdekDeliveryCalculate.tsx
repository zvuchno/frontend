import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { useSelectDeliveryTariff } from "@/entities/order";

import { calculateCdekDelivery } from "../api/cdek.api";
import type { TCdekData, TCdekPickupDetailsResponse } from "./types";

export function useCdekCalculate() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const queryClient = useQueryClient();
  const { setDeliverySelected } = useSelectDeliveryTariff();

  return useMutation<TCdekPickupDetailsResponse, Error, TCdekData>({
    mutationFn: (data: TCdekData) => calculateCdekDelivery(data, token),
    onSuccess: (data) => {
      queryClient.setQueryData(["delivery"], data);
    },
    onError: (error) => {
      toast.success(`Ошибка: ${error.message}`);
      setDeliverySelected({ price: 0 });
    },
  });
}
