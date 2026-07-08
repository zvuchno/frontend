import { type TCatalogListRequest, type TCatalogListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getCatalogList({
  token,
  type,
  genre,
  kind,
  artist,
  limit,
  offset,
  ordering,
}: TCatalogListRequest): Promise<TCatalogListResponse> {
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
  }

  const url = `${baseUrl}/v1/store/catalog/?${params.toString()}`;

  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Ошибка получения продуктов категории: ${type}`);
  }

  return (await response.json()) as TCatalogListResponse;
}
