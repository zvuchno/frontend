import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import type { TAddToFavoriteRequest, TAddToFavoriteResponse } from "./types";

const baseUrl = "/api/backend";

export const addToFavorites = async (payload: TAddToFavoriteRequest) => {
  return await authFetchClient<TAddToFavoriteResponse>(`${baseUrl}/v1/store/me/favorites/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
