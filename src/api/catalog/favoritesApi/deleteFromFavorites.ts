import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import { TDeleteFavoriteRequest } from "./types";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const deleteFromFavorites = async (payload: TDeleteFavoriteRequest) => {
  return await authFetchClient<void>(`${baseUrl}/v1/store/me/favorites/${payload.product_variant}/`, {
    method: 'DELETE',
  })
};