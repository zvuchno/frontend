/*import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TPaymentError, type TPaymentRequest, type TPaymentResponse } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

/*export async function initiatePayment(
  orderId: TPaymentRequest,
  token?: string
): Promise<TPaymentResponse | null> {
  //let confirmationToken;
  try {
    const res = await authFetchClient<TPaymentResponse | null>(
      `${baseUrl}/v1/store/payments/create/`,
      {
        method: "POST",
        body: JSON.stringify(orderId),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      token
    );

    if (!res) return null;

    return res;
  } catch (error) {
    console.log(error);
  }
}*/
