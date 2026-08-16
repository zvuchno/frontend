import { useMutation } from "@tanstack/react-query";

import { initiatePayment } from "../api/payment.api";
import { type TPaymentError, type TPaymentResponse } from "./types";

export function usePayment() {
  return useMutation<TPaymentResponse, TPaymentError, number>({
    mutationFn: (orderId: number) => initiatePayment({ order_id: orderId }),
  });
}
