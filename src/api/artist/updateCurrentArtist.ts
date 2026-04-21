import { requestArtist } from "./request";
import {
  UpdateCurrentArtistPayload,
  UpdateCurrentArtistResponse,
} from "./types";

const CURRENT_ARTIST_PATH = "/api/artist/me";

export async function updateCurrentArtist(
  payload: UpdateCurrentArtistPayload,
  token: string,
): Promise<UpdateCurrentArtistResponse> {
  return requestArtist<UpdateCurrentArtistResponse>(
    CURRENT_ARTIST_PATH,
    token,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
}

export default updateCurrentArtist;
