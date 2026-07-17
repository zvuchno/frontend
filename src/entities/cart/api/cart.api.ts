import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

//import { createAuthHeaders } from "@/api/store/request";

import type { TCart, TCartItem, UpdateCartPayload } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const CART_PATH = "/v1/store/cart";

export async function getCart(token?: string): Promise<TCart> {
  //try {
  //const init: RequestInit = { method: "GET" };

  //const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await authFetchClient<TCart>(
    `${baseUrl}${CART_PATH}/me/`,
    { method: "GET", credentials: "include" },

    token
  );

  if (!response) {
    throw new Error("Корзина пуста или не найдена");
  }
  return response;
  /*} catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Ошибка получения корзины: ${errorMessage}`);
  }*/
}

export async function addCartItem(payload: TCartItem, token?: string): Promise<TCart> {
  /*const init: RequestInit = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};
*/
  const response = await authFetchClient<TCart>(
    `${baseUrl}${CART_PATH}/me/add/`,
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

  if (!response) {
    throw new Error(`Ошибка добавления товара в корзину`);
  }

  return response;
}

export async function updateCart(payload: UpdateCartPayload, token?: string): Promise<TCart> {
  //const token = await checkAccessToken();
  /*const init: RequestInit = {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};
*/
  const response = await authFetchClient<TCart>(
    `${baseUrl}${CART_PATH}/me/`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error(`Ошибка обновления корзины`);
  }

  return response;
}

export async function removeCartItem(variantId: number, token?: string): Promise<void> {
  //const token = await checkAccessToken();
  //const init: RequestInit = { method: "DELETE" };

  //const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await authFetchClient(
    `${baseUrl}${CART_PATH}/me/remove/${variantId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error(`Ошибка удаления товара из корзины`);
  }

  return;
}

export async function applyCartPromoCode(promo: string, token?: string): Promise<TCart> {
  //const token = await checkAccessToken();
  /*const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({ code: promo }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};
*/
  const response = await authFetchClient<TCart>(
    `${baseUrl}${CART_PATH}/apply-promocode/`,
    {
      method: "POST",
      body: JSON.stringify({ code: promo }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error("Ошибка: Не удалось применить промокод");
  }

  return response;
}

export async function removeCartPromoCode(token?: string): Promise<TCart> {
  //const token = await checkAccessToken();
  //const init: RequestInit = { method: "POST" };

  //const headers = token ? createAuthHeaders(token, init.headers) : init.headers || {};

  const response = await authFetchClient<TCart>(
    `${baseUrl}${CART_PATH}/remove-promocode/`,
    {
      method: "POST",
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error(`Ошибка удаления промокода`);
  }

  return response;
}
