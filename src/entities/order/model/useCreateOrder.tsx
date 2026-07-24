import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { placeOrder } from "../api/order.api";
import type { TOrder, TOrderResponse } from "./types";

export function useCreateOrder() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const queriClient = useQueryClient();

  return useMutation<TOrderResponse, Error, TOrder>({
    mutationFn: (orderData: TOrder) => placeOrder(orderData, token),
    onSuccess: (data) => queriClient.setQueryData(["new-order"], data),
    onError: () => {
      toast.error("Неудалось отправить заказ. Попробуйте еще раз");
    },
  });
}
