import { requestArtist } from "./request";
import {
  UpdateCurrentArtistCoverPayload,
  UpdateCurrentArtistCoverResponse,
} from "./types";

const CURRENT_ARTIST_COVER_PATH = "/v1/artists/me/cover/";

export async function updateCurrentArtistCover(
  payload: UpdateCurrentArtistCoverPayload,
  token: string,
): Promise<UpdateCurrentArtistCoverResponse> {
  const formData = new FormData();
  formData.set("cover", payload.cover);

  return requestArtist<UpdateCurrentArtistCoverResponse>(
    CURRENT_ARTIST_COVER_PATH,
    token,
    {
      method: "PATCH",
      body: formData,
    },
  );
}

export default updateCurrentArtistCover;
