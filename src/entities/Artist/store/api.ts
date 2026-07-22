import { type TArtistLegalData, type TArtistLegalDataForApi } from "./types";
import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

const ARTIST_LEGAL_PATH = "/api/artist/me/legal";

export const updateArtistLegalData = async (
  legalData: TArtistLegalDataForApi,
): Promise<Partial<TArtistLegalData>> => {
  const response =  await authFetchClient<Partial<TArtistLegalData>>(ARTIST_LEGAL_PATH, {
    method: "PATCH",
    body: JSON.stringify(legalData),
  });

  if (!response) {
      throw new Error('Не удалось получить данные')
    }

    return response
};

export const getArtistLegalData =
  async (): Promise<Partial<TArtistLegalData>> => {
    const response =  await authFetchClient<Partial<TArtistLegalData>>(ARTIST_LEGAL_PATH, {
      method: "GET",
    });

    if (!response) {
      throw new Error('Не удалось получить данные')
    }

    return response
  };
