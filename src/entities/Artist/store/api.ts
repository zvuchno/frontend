import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TArtistLegalData, type TArtistLegalDataForApi } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const ARTIST_LEGAL_PATH = `${baseUrl}/v1/artists/me/legal/`;

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

export const updateArtistLegalData = async (
  legalData: TArtistLegalDataForApi,
  token?: string
): Promise<Partial<TArtistLegalData>> => {
  const response = await authFetchClient<Partial<TArtistLegalData>>(
    ARTIST_LEGAL_PATH,
    {
      method: "PATCH",
      body: JSON.stringify(legalData),
    },
    token
  );

  if (!response) {
    throw new Error("Не удалось получить данные");
  }

  return response;
};

export const getRecipientTypes = async (token?: string): Promise<unknown> => {
  const response = await authFetchClient<unknown>(
    `${ARTIST_LEGAL_PATH}recipient-types/`,
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
