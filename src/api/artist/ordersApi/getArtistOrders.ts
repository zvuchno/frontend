import { type PaginatedStoreResponse } from "@/api/store/types";
import { type TArtistOrder, type TArtistOrderDetails } from "./types";
import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getArtistOrders(token?: string, url?: string): Promise<PaginatedStoreResponse<TArtistOrder>> {
  const mainUrl = `${baseUrl}/v1/artists/me/sales?limit=6`;
  const currentUrl = url ? url : mainUrl;

  try {
    const data = await authFetchClient<PaginatedStoreResponse<TArtistOrder>>(currentUrl, {
      method: "GET",
    },
      token
    );

    if (!data) throw new Error('Ошибка получения заказов');

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Ошибка получения заказов`);
  }
};

export async function getArtistOrderDetails(orderId: string | number, token?: string): Promise<TArtistOrderDetails> {
  const url = `${baseUrl}/v1/artists/me/sales/${orderId}`
  const data = await authFetchClient<TArtistOrderDetails>(url, {
    method: "GET",
  },
    token
  );

  if (!data) {
    throw new Error('Пустой ответ от сервера');
  }

  return data;
};