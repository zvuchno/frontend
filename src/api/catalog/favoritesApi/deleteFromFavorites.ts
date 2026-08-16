import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import type { TDeleteFavoriteRequest } from "./types";

const baseUrl = "/api/backend";

export const deleteFromFavorites = async (payload: TDeleteFavoriteRequest) => {
  return await authFetchClient<void>(
    `${baseUrl}/v1/store/me/favorites/${payload.product_variant}/`,
    {
      method: "DELETE",
    }
  );
};
