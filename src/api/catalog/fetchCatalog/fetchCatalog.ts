const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

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

type TCatalogListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCatalogCard[];
}

type TCatalogListRequest = {
  type?: 'album' | 'all' | 'merch',
  artist?: string,
  genre?: string,
  kind?: string,
  limit?: number, 
  offset?: number,
  ordering?: '-created_at' | 'random',
}

export async function fetchCatalogList({
  type, 
  artist, 
  genre, 
  kind, 
  limit, 
  offset, 
  ordering
}: TCatalogListRequest): Promise<TCatalogListResponse> {

  const params = new URLSearchParams();

  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }

  if (offset !== undefined) {
    params.append('offset', offset.toString());
  }

  if (type !== undefined) {
    params.append('offset', type.toString());
  }

  if (artist !== undefined) {
    params.append('offset', artist.toString());
  }

  if (genre !== undefined) {
    params.append('offset', genre.toString());
  }

  if (kind !== undefined) {
    params.append('offset', kind.toString());
  }

  if (ordering !== undefined) {
    params.append('offset', ordering.toString());
  }

  const url = `${baseUrl}/v1/store/catalog/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch merch data");
  }

  return response.json();
};