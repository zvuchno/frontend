type Target = {
  type: string;
  url: string;
  selected_variant_id: number;
};

export type TCatalogCard = {
  product_id: number
  name: string;
  artist_name: string;
  kind: string;
  year: number;
  price: string;
  image: string;
  is_favorite: boolean;
  target: Target;
  className?: string;
};

export type TCatalogListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCatalogCard[];
};

export type TCatalogListRequest = {
  type?: 'album' | 'all' | 'merch',
  genre?: string | string[],
  kind?: string | string[],
  artist?: string;
  limit?: string, 
  offset?: string,
  ordering?: '-created_at' | 'random',
};