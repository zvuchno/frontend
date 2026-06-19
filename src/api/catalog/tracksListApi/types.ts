export type TTrack = {
  id: number;
  artist_name: string | null;
  name: string;
  album: number;
  duration: number | null;
  position: number;
  price: string;
  image: string;
  is_favorite: boolean;
  allow_overpay: boolean;
}

export type TracksListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TTrack[];
}

export type TrackListRequest = {
  albumId?: number,
  artist?: string,
  genre?: string,
  name?: string,
  limit?: number, 
  offset?: number
}