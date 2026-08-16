import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TPaymentRequest, type TPaymentResponse } from "../model/types";

const baseUrl = "/api/backend";

export async function initiatePayment(payload: TPaymentRequest): Promise<TPaymentResponse> {
  try {
    const res = await authFetchClient<TPaymentResponse | null>(
      `${baseUrl}/v1/store/payments/create/`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
