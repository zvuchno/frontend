import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TPaymentRequest, type TPaymentResponse } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function initiatePayment(
  payload: TPaymentRequest,
  token?: string
): Promise<TPaymentResponse> {
  //let confirmationToken;
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
      },
      token
    );

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
