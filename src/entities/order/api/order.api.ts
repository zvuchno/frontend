import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

//import { getApiAccessToken } from "@/api/authToken";

import type { TCheckoutData, TDeliveryOption, TOrder, TOrderResponse } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getDeliveryOptions(): Promise<TDeliveryOption[]> {
  const init: RequestInit = { method: "GET" };

  const response = await fetch(`${baseUrl}/v1/store/deliveries/`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Ошибка получения вариантов доставки: ${response.status}`);
  }
  console.log();
  return response.json() as Promise<TDeliveryOption[]>;
}

export async function getCheckoutData(token?: string): Promise<TCheckoutData> {
  //const token = await getApiAccessToken();
  /*const init: RequestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };*/
  const response = await authFetchClient<TCheckoutData>(
    `${baseUrl}/v1/store/orders/checkout/`,
    {
      method: "GET",
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error("Ошибка получения данных заказа");
  }
  return response;
}

export async function placeOrder(orderData: TOrder, token?: string): Promise<TOrderResponse> {
  //const token = await getApiAccessToken();
  /*const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
    credentials: "include",
  };*/

  const response = await authFetchClient<TOrderResponse>(
    `${baseUrl}/v1/store/orders/checkout/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error("Ошибка создания заказа");
  }
  return response;
}
