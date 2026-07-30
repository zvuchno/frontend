import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TArtistLegalData, type TArtistLegalDataForApi } from "./types";

const ARTIST_LEGAL_PATH = "/api/artist/me/legal";

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

export const getArtistLegalData = async (token?: string): Promise<Partial<TArtistLegalData>> => {
  const response = await authFetchClient<Partial<TArtistLegalData>>(
    ARTIST_LEGAL_PATH,
    {
      method: "GET",
    },
    token
  );

  if (!response) {
    throw new Error("Не удалось получить данные");
  }

  return response;
};
