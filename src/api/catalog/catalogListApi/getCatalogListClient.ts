import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TCatalogListRequest, type TCatalogListResponse } from "./types";

const baseUrl = "/api/backend";

export async function getCatalogListClient({
  type,
  genre,
  kind,
  artist,
  limit,
  offset,
  ordering,
}: TCatalogListRequest): Promise<TCatalogListResponse | null> {
  const params = new URLSearchParams();

  if (type !== undefined) {
    params.append("type", type.toString());
  }

  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }

  if (offset !== undefined) {
    params.append("offset", offset.toString());
  }

  if (artist !== undefined) {
    params.append("artist", artist.toString());
  }

  if (genre !== undefined) {
    if (Array.isArray(genre)) {
      params.set("genre", genre.join(","));
    } else {
      params.set("genre", genre);
    }
  }

  if (kind !== undefined) {
    if (Array.isArray(kind)) {
      params.set("kind", kind.join(","));
    } else {
      params.set("kind", kind);
    }
  }

  if (ordering !== undefined) {
    params.append("ordering", ordering.toString());
  } else {
    params.append("ordering", "-created_at");
  }

  const url = `${baseUrl}/v1/store/catalog?${params.toString()}`;

  try {
    const data = await authFetchClient<TCatalogListResponse>(url, {
      method: "GET",
    });

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : `Ошибка получения продуктов категории: ${type}`
    );
  }
}
