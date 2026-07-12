export type TArtistCard = {
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  slug: string;
};

export type TArtistsListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TArtistCard[];
};

export type TArtistsListRequest = {
  token?: string,
  genre?: string | string[],
  limit?: string, 
  offset?: string,
  ordering?: '-created_at' | 'random',
}