type Target = {
  type: string;
  url: string;
  selected_variant_id: number;
}

type TCatalogCard = {
  product_id: number
  name: string;
  artist_name: string;
  kind: string;
  year: number;
  price: string;
  image: string;
  is_favorite: boolean;
  target: Target;
}

export type TCatalogListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCatalogCard[];
}

export type TCatalogListRequest = {
  type?: 'album' | 'all' | 'merch',
  artist?: string,
  genre?: string,
  kind?: string,
  limit?: number, 
  offset?: number,
  ordering?: '-created_at' | 'random',
}