import { publicFetchServer } from "@/api/publicFetchFromServer/publicFetchServer";

import { type TArtistsListRequest, type TArtistsListResponse } from "./types";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? (process.env.BASE_API_URL_DEV ?? process.env.NEXT_PUBLIC_BASE_API_URL)
    : (process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL);

export async function getArtistsListServer({
  genre,
  limit,
  offset,
  ordering,
}: TArtistsListRequest): Promise<TArtistsListResponse | null> {
  const params = new URLSearchParams();

  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }

  if (offset !== undefined) {
    params.append("offset", offset.toString());
  }

  if (genre !== undefined) {
    if (Array.isArray(genre)) {
      params.set("genre", genre.join(","));
    } else {
      params.set("genre", genre);
    }
  }

  if (ordering !== undefined) {
    params.append("ordering", ordering.toString());
  }
  if (!baseUrl) {
    throw new Error("API base URL is not configured");
  }

  const url = `${baseUrl}/v1/artists/?${params.toString()}`;

  console.info("[getArtistsListServer] API origin:", new URL(baseUrl).origin);

  try {
    const response = await publicFetchServer<TArtistsListResponse>(url, {
      method: "GET",
    });

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Ошибка получения списка артистов");
  }
}
