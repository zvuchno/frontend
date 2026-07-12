import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { TAddToFavoriteRequest, TAddToFavoriteResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const addToFavorites = async (payload: TAddToFavoriteRequest) => {
  return await authFetchClient<TAddToFavoriteResponse>(`${baseUrl}/v1/store/me/favorites/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
};