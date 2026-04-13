import { requestArtist } from "./request";
import { CurrentArtistResponse } from "./types";

const CURRENT_ARTIST_PATH = "/v1/artists/me/";

export async function getCurrentArtist(
  token: string,
): Promise<CurrentArtistResponse> {
  return requestArtist<CurrentArtistResponse>(CURRENT_ARTIST_PATH, token, {
    method: "GET",
  });
}

export default getCurrentArtist;
