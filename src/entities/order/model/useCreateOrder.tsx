import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { placeOrder } from "../api/order.api";
import type { TOrder, TOrderResponse } from "./types";

export function useCreateOrder() {
  return useMutation<TOrderResponse, Error, TOrder>({
    mutationFn: (orderData: TOrder) => placeOrder(orderData),
    onSuccess: () => {
      toast.error("Заказ успешно создан!");
    },
    onError: () => {
      toast.error("Неудалось отправить заказ. Попробуйте еще раз");
    },
  });
}
