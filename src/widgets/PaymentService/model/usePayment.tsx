import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { initiatePayment } from "../api/payment.api";
import { type TPaymentError, type TPaymentResponse } from "./types";

export function usePayment() {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useMutation<TPaymentResponse, TPaymentError, number>({
    mutationFn: (orderId: number) => initiatePayment({ order_id: orderId }, token),
  });
}
