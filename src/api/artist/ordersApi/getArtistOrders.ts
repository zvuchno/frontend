import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import { type PaginatedStoreResponse } from "@/api/store/types";

import { type TArtistOrder, type TArtistOrderDetails } from "./types";

const baseUrl = "/api/backend";

export async function getArtistOrders(url?: string): Promise<PaginatedStoreResponse<TArtistOrder>> {
  const mainUrl = `${baseUrl}/v1/artists/me/sales?limit=6`;
  const currentUrl = url ? url : mainUrl;

  try {
    const data = await authFetchClient<PaginatedStoreResponse<TArtistOrder>>(currentUrl, {
      method: "GET",
    });

    if (!data) throw new Error("Ошибка получения заказов");

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Ошибка получения заказов`);
  }
}

export async function getArtistOrderDetails(
  orderId: string | number
): Promise<TArtistOrderDetails> {
  const url = `${baseUrl}/v1/artists/me/sales/${orderId}`;
  const data = await authFetchClient<TArtistOrderDetails>(url, {
    method: "GET",
  });

  if (!data) {
    throw new Error("Пустой ответ от сервера");
  }

  return data;
}

export async function downloadArtistSalesReport(
  periodStart: string,
  periodEnd: string
): Promise<{ blob: Blob; filename: string }> {
  const searchParams = new URLSearchParams({
    period_end: periodEnd,
    period_start: periodStart,
  });
  const url = `${baseUrl}/v1/store/artists/me/sales/export?${searchParams.toString()}`;
  const data = await fetch(url, {
    method: "GET",
    headers: {},
    credentials: "include",
  });

  if (!data.ok) {
    throw new Error(`Ошибка при скачивании отчета`);
  }

  const disposition = data.headers.get("content-disposition");

  const matches = disposition?.match(/filename="?([^"]+)"?/) ?? null;

  const filename = matches !== null ? matches[1] : `sales-${periodStart}-${periodEnd}.csv`;

  const blob = await data.blob();
  return { blob, filename };
}
