export type TPlayBack = {
  status: 'pending' | 'building' | 'ready' | 'failed';
  kind: string | null;
  duration: number | null;
  url: string | null;
}

type TPurchase = {
  variant_id: number;
  price: string;
  allow_overpay: boolean;
}

export type TTrack = {
  id: number;
  artist_name: string | null;
  name: string;
  album: number;
  duration: number | null;
  position: number | null;
  image: string | null;
  is_favorite: boolean;
  playback: TPlayBack;
  purchase?: TPurchase;
  favorite_variant_id: number;
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
  token?: string;
}