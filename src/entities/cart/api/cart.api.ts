import { createAuthHeaders } from "@/api/store/request";

import type { TCart, TCartItem, UpdateCartPayload } from "../model/types";

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
  payload: UpdateCartPayload,
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
  promo: string,
  token?: string,
): Promise<TCart> {
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({ code: promo }),
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
    let serverErrorMessage = "";
    
    try {
      const errorData = await response.json();

      if (errorData && typeof errorData === "object") {
        serverErrorMessage =
          errorData.detail ||
          errorData.message ||
          Object.values(errorData).flat().join(", ");
        
      }
    } catch {}

    if (serverErrorMessage) {
      throw new Error(serverErrorMessage);
    }
      throw new Error(
        `Ошибка ${response.status}: Не удалось применить промокод`,
      );
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
