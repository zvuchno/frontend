import { type TrackListRequest, type TracksListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getTracksList({
  albumId,
}: TrackListRequest): Promise<TracksListResponse> {

  const url = `${baseUrl}/v1/store/player/albums/${albumId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch tracks data");
  }

  return (await response.json()) as TracksListResponse;
}
