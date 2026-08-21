import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import type { TCart, TCartItem, UpdateCartPayload } from "../model/types";

const baseUrl = "/api/backend";
const CART_PATH = "/v1/store/cart";

export async function getCart(): Promise<TCart> {
  const response = await authFetchClient<TCart>(`${baseUrl}${CART_PATH}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response) {
    throw new Error("Корзина пуста или не найдена");
  }
  return response;
}

export async function addCartItem(payload: TCartItem): Promise<TCart> {
  const response = await authFetchClient<TCart>(`${baseUrl}${CART_PATH}/me/add/`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response) {
    throw new Error(`Ошибка добавления товара в корзину`);
  }

  return response;
}

export async function updateCart(payload: UpdateCartPayload): Promise<TCart> {
  const response = await authFetchClient<TCart>(`${baseUrl}${CART_PATH}/me`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response) {
    throw new Error(`Ошибка обновления корзины`);
  }

  return response;
}

export async function removeCartItem(variantId: number): Promise<void> {
  await authFetchClient(`${baseUrl}${CART_PATH}/me/remove/${variantId}/`, {
    method: "DELETE",
    credentials: "include",
  });

  return;
}

export async function applyCartPromoCode(promo: string): Promise<TCart> {
  const response = await authFetchClient<TCart>(`${baseUrl}${CART_PATH}/apply-promocode/`, {
    method: "POST",
    body: JSON.stringify({ code: promo }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response) {
    throw new Error("Ошибка: Не удалось применить промокод");
  }

  return response;
}

export async function removeCartPromoCode(): Promise<TCart> {
  const response = await authFetchClient<TCart>(`${baseUrl}${CART_PATH}/remove-promocode/`, {
    method: "POST",
    credentials: "include",
  });

  if (!response) {
    throw new Error(`Ошибка удаления промокода`);
  }

  return response;
}
