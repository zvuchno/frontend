/*import { useMutation, useQuery } from "@tanstack/react-query"
import { TPaymentError, TPaymentRequest, TPaymentResponse } from "./types"
import { initiatePayment } from "../api/payment.api"

export function usePayment(orderId: number) {
  return useMutation<TPaymentRequest, TPaymentError, TPaymentResponse>({
    mutationKey: ['confirmation-token', orderId],
    mutationFn: initiatePayment
  })
}*/