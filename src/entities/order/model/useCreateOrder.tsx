import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { placeOrder } from "../api/order.api";
import type { TOrder, TOrderResponse } from "./types";

export function useCreateOrder() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation<TOrderResponse, Error, TOrder>({
    mutationFn: (orderData: TOrder) => placeOrder(orderData, token),
    onSuccess: () => {
      toast.success("Заказ успешно создан!");
    },
    onError: () => {
      toast.error("Неудалось отправить заказ. Попробуйте еще раз");
    },
  });
}
