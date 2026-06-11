type TTrack = {
  id: number;
  name: string;
  album: number;
  duration: number;
  position: number;
  price: number;
}

type TracksListResponse = {
  count: number;
  next: string;
  previous: string;
  results: TTrack[];
}

type TrackListRequest = {
  albumId: number,
  limit?: number, 
  offset?: number
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getTracksListByAlbum({ albumId, limit, offset }: TrackListRequest ): Promise<TracksListResponse> {

  const params = new URLSearchParams();

  params.append('album', albumId.toString());

  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }

  if (offset !== undefined) {
    params.append('offset', offset.toString());
  }

  const url = `${baseUrl}/v1/store/tracks/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch tracks data");
  }

  return response.json();
};