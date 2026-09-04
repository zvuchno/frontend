import { publicFetchServer } from "@/api/publicFetchFromServer/publicFetchServer";

import { type TArtistsListRequest, type TArtistsListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

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

  const url = `${baseUrl}/v1/artists/?${params.toString()}`;

  try {
    const response = await publicFetchServer<TArtistsListResponse>(url, {
      method: "GET",
    });

    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Ошибка получения списка артистов");
  }
}
