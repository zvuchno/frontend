import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import type { TManagedProfileResponse } from "../model/types";

const baseURL = "/api/backend";
const LABEL_MANAGED_ARTISTS_PATH = `${baseURL}/v1/artists/me/managed-profiles/`;

export async function getManagedProfiles(): Promise<TManagedProfileResponse> {
  const response = await authFetchClient<TManagedProfileResponse>(LABEL_MANAGED_ARTISTS_PATH, {
    method: "GET",
  });

  if (!response) {
    throw new Error("Не удалось получить профили артистов");
  }

  return response;
}
