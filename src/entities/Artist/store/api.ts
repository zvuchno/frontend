import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TArtistLegalData, type TArtistLegalDataForApi } from "./types";

const baseUrl = "/api/backend";
const ARTIST_LEGAL_PATH = `${baseUrl}/v1/artists/me/legal`;

export const getArtistLegalData = async (): Promise<Partial<TArtistLegalData>> => {
  const response = await authFetchClient<Partial<TArtistLegalData>>(ARTIST_LEGAL_PATH, {
    method: "GET",
  });

  if (!response) {
    throw new Error("Не удалось получить данные");
  }

  return response;
};

export const updateArtistLegalData = async (
  legalData: TArtistLegalDataForApi
): Promise<Partial<TArtistLegalData>> => {
  const response = await authFetchClient<Partial<TArtistLegalData>>(ARTIST_LEGAL_PATH, {
    method: "PATCH",
    body: JSON.stringify(legalData),
  });

  if (!response) {
    throw new Error("Не удалось получить данные");
  }

  return response;
};

export const getRecipientTypes = async (): Promise<unknown> => {
  const response = await authFetchClient<unknown>(`${ARTIST_LEGAL_PATH}/recipient-types/`, {
    method: "GET",
  });

  if (!response) {
    throw new Error("Не удалось получить данные");
  }

  return response;
};
