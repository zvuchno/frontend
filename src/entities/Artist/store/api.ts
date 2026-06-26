import { requestArtist } from "@/api/artist/request";
import { type TArtistLegalData, type TArtistLegalDataForApi } from "./types";

const ARTIST_LEGAL_PATH = "/api/artist/me/legal";

export const updateArtistLegalData = async (
  legalData: TArtistLegalDataForApi,
): Promise<Partial<TArtistLegalData>> => {
  return requestArtist<Partial<TArtistLegalData>>(ARTIST_LEGAL_PATH, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(legalData),
  });
};

export const getArtistLegalData =
  async (): Promise<Partial<TArtistLegalData>> => {
    return requestArtist<Partial<TArtistLegalData>>(ARTIST_LEGAL_PATH, {
      method: "GET",
    });
  };
