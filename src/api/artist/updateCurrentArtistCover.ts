import { requestArtist } from "./request";
import {
  UpdateCurrentArtistCoverPayload,
  UpdateCurrentArtistCoverResponse,
} from "./types";

const CURRENT_ARTIST_COVER_PATH = "/api/artist/me/cover";

export async function updateCurrentArtistCover(
  payload: UpdateCurrentArtistCoverPayload,
): Promise<UpdateCurrentArtistCoverResponse> {
  const formData = new FormData();
  formData.set("cover", payload.cover);

  return requestArtist<UpdateCurrentArtistCoverResponse>(
    CURRENT_ARTIST_COVER_PATH,
    {
      method: "PATCH",
      body: formData,
    },
  );
}

export default updateCurrentArtistCover;
