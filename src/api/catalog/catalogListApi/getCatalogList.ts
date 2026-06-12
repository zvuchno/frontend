import { TCatalogListRequest, TCatalogListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getCatalogList({
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