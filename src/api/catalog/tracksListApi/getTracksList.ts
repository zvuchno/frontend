import { type TrackListRequest, type TracksListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getTracksList({
  albumId,
  artist,
  genre,
  name,
  limit,
  offset,
}: TrackListRequest): Promise<TracksListResponse> {
  const params = new URLSearchParams();

  if (albumId !== undefined) {
    params.append("album", albumId.toString());
  }

  if (artist !== undefined) {
    params.append("album", artist);
  }

  if (genre !== undefined) {
    params.append("album", genre);
  }

  if (name !== undefined) {
    params.append("album", name);
  }

  if (limit !== undefined) {
    params.append("limit", limit.toString());
  }

  if (offset !== undefined) {
    params.append("offset", offset.toString());
  }

  const url = `${baseUrl}/v1/store/tracks/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch tracks data");
  }

  return (await response.json()) as TracksListResponse;
}
