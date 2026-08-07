import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { TManagedProfileResponse } from "../model/types";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
const LABEL_MANAGED_ARTISTS_PATH = `${baseURL}/v1/artists/me/managed-profiles/`;

export async function getManagedProfiles(token?: string): Promise<TManagedProfileResponse> {

  const response = await authFetchClient<TManagedProfileResponse>(LABEL_MANAGED_ARTISTS_PATH, {
    method: "GET"
  },
    token
  )

  if (!response) {
    throw new Error('Не удалось получить профили артистов');
  }

  return response;
};