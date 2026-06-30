type TPlayBack = {
  status: 'pending' | 'building' | 'ready' | 'failed';
  kind: string | null;
  duration: number | null;
  url: string | null;
}

export type TTrack = {
  id: number;
  artist_name: string | null;
  name: string;
  album: number;
  duration: number | null;
  position: number | null;
  price: string;
  image: string | null;
  is_favorite: boolean;
  allow_overpay: boolean;
  playback: TPlayBack;
}

export type TracksListResponse = {
  id: number;
  name: string;
  artist_name: string | null;
  cover_image: string | null;
  tracks: TTrack[];
}

export type TrackListRequest = {
  albumId: number;
}