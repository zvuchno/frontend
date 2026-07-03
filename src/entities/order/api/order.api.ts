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

export async function getCheckoutData(): Promise<TCheckoutData> {
  const init: RequestInit = { method: "GET" };
  const response = await fetch(`${baseUrl}/v1/store/orders/checkout/`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error("Ошибка получения данных заказа");
  }
  return response.json() as Promise<TCheckoutData>;
}

export async function placeOrder(orderData: TOrder): Promise<TOrderResponse> {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
    credentials: "include",
  };

  const response = await fetch(`${baseUrl}/v1/store/orders/checkout/`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error("Ошибка создания заказа");
  }
  return (await response.json()) as TOrderResponse;
}
