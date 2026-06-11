import { createAuthHeaders } from "@/api/store/request";

import type { TCart, TCartItem } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const CART_PATH = "/v1/store/cart";

export async function getCart(token?: string): Promise<TCart> {
  const init: RequestInit = { method: "GET" };

  const headers = token
    ? createAuthHeaders(token, init.headers)
    : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/me/`, {
    ...init,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка получения корзины: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}

export async function addCartItem(
  payload: TCartItem,
  token?: string,
): Promise<TCart> {
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const headers = token
    ? createAuthHeaders(token, init.headers)
    : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/me/add/`, {
    ...init,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка добавления товара в корзину: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}

export async function updateCart(
  payload: Partial<TCartItem>,
  token?: string,
): Promise<TCart> {
  const init: RequestInit = {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const headers = token
    ? createAuthHeaders(token, init.headers)
    : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/me/`, {
    ...init,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка обновления корзины: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}

export async function removeCartItem(
  variantId: number,
  token?: string,
): Promise<void> {
  const init: RequestInit = { method: "DELETE" };

  const headers = token
    ? createAuthHeaders(token, init.headers)
    : init.headers || {};

  const response = await fetch(
    `${baseUrl}${CART_PATH}/me/remove/${variantId}`,
    {
      ...init,
      headers: headers,
    },
  );

  if (!response.ok) {
    throw new Error(`Ошибка удаления товара из корзины: ${response.status}`);
  }

  return;
}

export async function applyCartPromoCode(
  code: string,
  token?: string,
): Promise<TCart> {
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify(code),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const headers = token
    ? createAuthHeaders(token, init.headers)
    : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/apply-promocode/`, {
    ...init,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка добавления промокода: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}

export async function removeCartPromoCode(token?: string): Promise<TCart> {
  const init: RequestInit = { method: "POST" };

  const headers = token
    ? createAuthHeaders(token, init.headers)
    : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/remove-promocode/`, {
    ...init,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка удаления промокода: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}
