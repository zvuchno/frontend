import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TrackListRequest, type TracksListResponse } from "./types";

const baseUrl = "/api/backend";

export async function getTracksList({ albumId }: TrackListRequest) {
  const url = `${baseUrl}/v1/store/player/albums/${albumId}/`;

  try {
    const data = await authFetchClient<TracksListResponse>(url, {
      method: "GET",
    });

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Faild to fetch tracks data");
  }
}
