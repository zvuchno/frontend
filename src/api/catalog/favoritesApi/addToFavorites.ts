import { authApiFetch } from "@/api/authApiClient";
import { TAddToFavoriteRequest, TAddToFavoriteResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const addToFavorites = async (payload: TAddToFavoriteRequest) => {
  return authApiFetch<TAddToFavoriteResponse>(`${baseUrl}/v1/store/me/favorites/`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
};