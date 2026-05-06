type TArtist = {
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  slug: string;
};

export interface ListArtistsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TArtist[];
};