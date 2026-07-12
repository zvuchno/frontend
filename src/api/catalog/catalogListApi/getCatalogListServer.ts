import { authFetchServer } from "@/api/authFetchFromServer/authFetchServer";
import { TCatalogListRequest, TCatalogListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getCatalogListServer({
  token,
  type,
  genre,
  kind,
  artist,
  limit,
  offset,
  ordering,
}: TCatalogListRequest) {
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

  try {
    const response = await authFetchServer<TCatalogListResponse>(url, {
      method: "GET",
    },
      token,
    );
    return response;

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : `Ошибка получения продуктов категории: ${type}`);
  }
}