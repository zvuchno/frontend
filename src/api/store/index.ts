import type {
  PaginatedStoreResponse,
  PurchasedReleaseDownloadData,
  PurchasedReleaseDownloadOptions,
  PurchasedReleases,
  StoreFavorite,
  StoreOrder,
  StoreOrderDetail,
  StoreOrderItem,
} from "@/api/store/types";
import { authFetchClient } from "../authFetchFromClient/authFetchClient";

// const FALLBACK_PRODUCT_IMAGE = "/images/favorite-cassette.png";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

// function formatPrice(value?: string | number | null): string | number | null {
//   if (value === undefined || value === null || value === "") {
//     return null;
//   }

//   return value;
// }

// function getCatalogItemImage(item: StoreCatalogItem): string {
//   return item.cover_image || item.main_image || FALLBACK_PRODUCT_IMAGE;
// }

// function getOrderItemImage(item: StoreOrderItem): string {
//   return item.image || FALLBACK_PRODUCT_IMAGE;
// }

// function getOrderItemDescription(item: StoreOrderItem): string {
//   const parts = [item.property_name, item.property_value]
//     .map((part) => part?.trim())
//     .filter(Boolean);

//   return parts.length > 0 ? parts.join(": ") : item.sku;
// }

// function getStoreItemType(targetUrl?: string): "album" | "track" | "merch" {
//   if (targetUrl?.includes("/store/tracks/")) {
//     return "track";
//   }

//   if (targetUrl?.includes("/store/albums/")) {
//     return "album";
//   }

//   return "merch";
// }

// function isReleaseTarget(targetUrl: string): boolean {
//   return targetUrl.includes("/store/albums/") || targetUrl.includes("/store/tracks/");
// }

// async function getStoreItemByTargetUrl(targetUrl: string): Promise<StoreCatalogItem | null> {
//   if (!targetUrl) {
//     return null;
//   }

//   return requestStore<StoreCatalogItem>(
//     `/api/store/item?targetUrl=${encodeURIComponent(targetUrl)}`,
//     {
//       method: "GET",
//     }
//   );
// }

export async function getFavoriteProducts(token?: string, url?: string): Promise<PaginatedStoreResponse<StoreFavorite>> {
  const mainUrl = `${baseUrl}/v1/store/me/favorites/?limit=6`;
  const currentUrl = url ? url : mainUrl;

  try {
    const data = await authFetchClient<PaginatedStoreResponse<StoreFavorite>>(currentUrl, {
      method: "GET",
    },
      token
    );

    if (!data) throw new Error('Ошибка получения избранного')

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Ошибка получения избранного`);
  }
}

export async function getOrders(token?: string, url?: string): Promise<PaginatedStoreResponse<StoreOrder>> {
  const mainUrl = `${baseUrl}/v1/store/orders?limit=6`;
  const currentUrl = url ? url : mainUrl;

  try {
    const data = await authFetchClient<PaginatedStoreResponse<StoreOrder>>(currentUrl, {
      method: "GET",
    }, token);

    if (!data) throw new Error('Ошибка получения заказов');

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Ошибка получения заказов`);
  }
  
}

export async function getOrderDetail(orderId: string | number, token?: string): Promise<StoreOrderDetail> {
  const url = `${baseUrl}/v1/store/orders/${orderId}`
  const data = await authFetchClient<StoreOrderDetail>(url, {
    method: "GET",
  }, token);

  if (!data) {
    throw new Error('Пустой ответ от сервера');
  }

  return data;
}

export async function getPurchasedReleases(token?: string, url?: string): Promise<PaginatedStoreResponse<PurchasedReleases>> {
  const mainUrl = `${baseUrl}/v1/store/me/purchased-music?limit=6`;
  const currentUrl = url ? url : mainUrl;
  const data = await authFetchClient<PaginatedStoreResponse<PurchasedReleases>>(currentUrl, {
    method: "GET",
  }, token);

  if (!data) {
    throw new Error('Пустой ответ от сервера');
  }

  return data;
};

export async function getDownloadOptions(albumId: number, token?: string): Promise<PurchasedReleaseDownloadOptions> {
  const url = `${baseUrl}/v1/store/me/purchased-music/${albumId}`
  const data = await authFetchClient<PurchasedReleaseDownloadOptions>(url, {
    method: "GET",
  }, token);

  if (!data) {
    throw new Error('Пустой ответ от сервера');
  }

  return data;
};

export async function getDownloadData(url: string, token?: string): Promise<PurchasedReleaseDownloadData> {
  const data = await authFetchClient<PurchasedReleaseDownloadData>(url, {
    method: "POST",
  }, token);

  if (!data) {
    throw new Error('Пустой ответ от сервера');
  }

  return data;
};

export type { PurchasedReleases, StoreOrder, StoreOrderDetail, StoreOrderItem };
