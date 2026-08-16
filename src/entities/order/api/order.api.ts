import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import type { TCheckoutData, TDeliveryOption, TOrder, TOrderResponse } from "../model/types";

const baseUrl = "/api/backend";

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

export async function getCheckoutData(): Promise<TCheckoutData> {
  const response = await authFetchClient<TCheckoutData>(`${baseUrl}/v1/store/orders/checkout/`, {
    method: "GET",
    credentials: "include",
  });

  if (!response) {
    throw new Error("Ошибка получения данных заказа");
  }
  return response;
}

export async function placeOrder(orderData: TOrder): Promise<TOrderResponse> {
  const response = await authFetchClient<TOrderResponse>(`${baseUrl}/v1/store/orders/checkout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
    credentials: "include",
  });

  if (!response) {
    throw new Error("Ошибка создания заказа");
  }
  return response;
}
