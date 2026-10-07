import { type TArtistsListRequest, type TArtistsListResponse } from "./types";
import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getArtistsListClient({
  genre,
  limit,
  offset,
  ordering,
  url,
}: TArtistsListRequest): Promise<TArtistsListResponse> {
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

  const mainUrl = `${baseUrl}/v1/artists/?${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  try {
    const response = await authFetchClient<TArtistsListResponse>(currentUrl, {
      method: "GET",
    });

    if (!response) throw new Error("Ошибка получения списка артистов");

    return response;

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Ошибка получения списка артистов");
  }
}
