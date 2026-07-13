import { requestStore, requestStoreWithoutResponse } from "@/api/store/request";
import type {
  FanProductCardData,
  PaginatedStoreResponse,
  StoreCatalogItem,
  StoreFavorite,
  StoreOrder,
  StoreOrderDetail,
  StoreOrderItem,
} from "@/api/store/types";
import { authFetchClient } from "../authFetchFromClient/authFetchClient";

const DEFAULT_LIMIT = 100;
const FALLBACK_PRODUCT_IMAGE = "/images/favorite-cassette.png";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatPrice(value?: string | number | null): string | number | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return value;
}

function getCatalogItemImage(item: StoreCatalogItem): string {
  return item.cover_image || item.main_image || FALLBACK_PRODUCT_IMAGE;
}

function getOrderItemImage(item: StoreOrderItem): string {
  return item.image || FALLBACK_PRODUCT_IMAGE;
}

function getOrderItemDescription(item: StoreOrderItem): string {
  const parts = [item.property_name, item.property_value]
    .map((part) => part?.trim())
    .filter(Boolean);

  return parts.length > 0 ? parts.join(": ") : item.sku;
}

function getStoreItemType(targetUrl?: string): "album" | "track" | "merch" {
  if (targetUrl?.includes("/store/tracks/")) {
    return "track";
  }

  if (targetUrl?.includes("/store/albums/")) {
    return "album";
  }

  return "merch";
}

function toReleaseCardData(item: StoreOrderItem, detail?: StoreCatalogItem): FanProductCardData {
  const detailImage = detail ? detail.cover_image || detail.main_image || null : null;

  return {
    id: `${item.target_url}-${item.sku}`,
    image: detailImage || getOrderItemImage(item),
    title: detail?.name || item.name,
    description: detail?.description || getOrderItemDescription(item),
    price: null,
    targetUrl: item.target_url,
    downloadUrl: detail?.audio_file ?? null,
  };
}

function isReleaseTarget(targetUrl: string): boolean {
  return targetUrl.includes("/store/albums/") || targetUrl.includes("/store/tracks/");
}

async function getStoreItemByTargetUrl(targetUrl: string): Promise<StoreCatalogItem | null> {
  if (!targetUrl) {
    return null;
  }

  return requestStore<StoreCatalogItem>(
    `/api/store/item?targetUrl=${encodeURIComponent(targetUrl)}`,
    {
      method: "GET",
    }
  );
}

export async function getFavoriteProducts(url?: string): Promise<PaginatedStoreResponse<StoreFavorite>> {
  const mainUrl = `${baseUrl}/v1/store/me/favorites/?limit=6`;
  const currentUrl = url ? url : mainUrl;

  try {
    const data = await authFetchClient<PaginatedStoreResponse<StoreFavorite>>(currentUrl, {
      method: "GET",
    });

    if (!data) throw new Error('Ошибка получения избранного')

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Ошибка получения избранного`);
  }
}

export async function deleteFavorite(favoriteId: number): Promise<void> {
  return requestStoreWithoutResponse(`/api/store/me/favorites/${favoriteId}`, {
    method: "DELETE",
  });
}

export async function getOrders(): Promise<StoreOrder[]> {
  const orders = await requestStore<PaginatedStoreResponse<StoreOrder>>(
    `/api/store/orders?limit=${DEFAULT_LIMIT}`,
    {
      method: "GET",
    }
  );

  return orders.results;
}

export async function getOrderDetail(orderId: string | number): Promise<StoreOrderDetail> {
  return requestStore<StoreOrderDetail>(`/api/store/orders/${orderId}`, {
    method: "GET",
  });
}

export async function getOrdersWithDetails(): Promise<StoreOrderDetail[]> {
  const orders = await getOrders();

  return Promise.all(
    orders.map(async (order) => {
      const detail = await getOrderDetail(order.id);

      return {
        ...detail,
        items_count: order.items_count,
        status: detail.status ?? order.status,
        total: detail.total ?? order.total,
        order_number: detail.order_number ?? order.order_number,
        created_at: detail.created_at ?? order.created_at,
      };
    })
  );
}

export async function getPurchasedReleases(): Promise<FanProductCardData[]> {
  const orders = await getOrdersWithDetails();
  const releaseItems = orders.flatMap((order) =>
    order.items.filter((item) => isReleaseTarget(item.target_url))
  );

  const cards = await Promise.all(
    releaseItems.map(async (item) => {
      const detail = await getStoreItemByTargetUrl(item.target_url);

      return toReleaseCardData(item, detail ?? undefined);
    })
  );

  return cards;
}

export type { FanProductCardData, StoreOrder, StoreOrderDetail, StoreOrderItem };
