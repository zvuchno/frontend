import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { 
  CurrentArtistResponse,
  UpdateCurrentArtistCoverPayload, 
  UpdateCurrentArtistCoverResponse, 
  UpdateCurrentArtistPayload, 
  UpdateCurrentArtistResponse 
} from "../model/types";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
const CURRENT_ARTIST_PATH = `${baseURL}/v1/artists/me/`;
const CURRENT_ARTIST_COVER_PATH = `${baseURL}/v1/artists/me/cover/`;

export async function getCurrentArtist(token?: string): Promise<CurrentArtistResponse> {

  const response = await authFetchClient<CurrentArtistResponse>(CURRENT_ARTIST_PATH, {
    method: "GET"
  },
    token
  )

  if (!response) {
    throw new Error('Не удалось получить профиль слушателя');
  }

  return response;
};

export async function updateCurrentArtist(
  payload: UpdateCurrentArtistPayload,
  token?: string
): Promise<UpdateCurrentArtistResponse> {
  const response = await authFetchClient<UpdateCurrentArtistResponse>(CURRENT_ARTIST_PATH, {
    method: "PATCH",
    body: JSON.stringify(payload),
  },
    token
  )
  if (!response) {
    throw new Error('Не удалось обновить профиль артиста');
  }

  return response;
};

export async function updateCurrentArtistCover(
  payload: UpdateCurrentArtistCoverPayload,
  token?: string,
): Promise<UpdateCurrentArtistCoverResponse> {
  const formData = new FormData();
  formData.set("cover", payload.cover);

  const response = await authFetchClient<UpdateCurrentArtistCoverResponse>(CURRENT_ARTIST_COVER_PATH, {
    method: "PATCH",
    body: formData,
  },
    token
  )
  if (!response) {
    throw new Error('Не удалось обновить обложку артиста');
  }

  return response;
};