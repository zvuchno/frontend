import { checkAccessToken } from "@/api/authToken";
import { createAuthHeaders } from "@/api/store/request";

import type { TCart, TCartItem, UpdateCartPayload } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const CART_PATH = "/v1/store/cart";

export async function getCart(): Promise<TCart> {
  const token = await checkAccessToken();
  try {
    const init: RequestInit = { method: "GET" };

    const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

    const response = await fetch(`${baseUrl}${CART_PATH}/me/`, {
      ...init,
      headers: headers,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Статус сервера: ${response.status}`);
    }
    return response.json() as Promise<TCart>;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Ошибка получения корзины: ${errorMessage}`);
  }
}

export async function addCartItem(payload: TCartItem): Promise<TCart> {
  const token = await checkAccessToken();
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/me/add/`, {
    ...init,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка добавления товара в корзину: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}

export async function updateCart(payload: UpdateCartPayload): Promise<TCart> {
  const token = await checkAccessToken();
  const init: RequestInit = {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/me/`, {
    ...init,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка обновления корзины: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}

export async function removeCartItem(variantId: number): Promise<void> {
  const token = await checkAccessToken();
  const init: RequestInit = { method: "DELETE" };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/me/remove/${variantId}`, {
    ...init,
    headers: headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Ошибка удаления товара из корзины: ${response.status}`);
  }

  return;
}

export async function applyCartPromoCode(promo: string): Promise<TCart> {
  const token = await checkAccessToken();
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({ code: promo }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/apply-promocode/`, {
    ...init,
    headers: headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = (await response.json()) as Error;

    if (errorData && typeof errorData === "object") {
      throw new Error(
        errorData.message || `Ошибка ${response.status}: Не удалось применить промокод`
      );
    }
    throw new Error(`Ошибка ${response.status}: Не удалось применить промокод`);
  }

  return (await response.json()) as Promise<TCart>;
}

export async function removeCartPromoCode(): Promise<TCart> {
  const token = await checkAccessToken();
  const init: RequestInit = { method: "POST" };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await fetch(`${baseUrl}${CART_PATH}/remove-promocode/`, {
    ...init,
    headers: headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Ошибка удаления промокода: ${response.status}`);
  }

  return response.json() as Promise<TCart>;
}
