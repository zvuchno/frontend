import { TCatalogListRequest, TCatalogListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getCatalogList({
  type,
  genre, 
  kind, 
  limit, 
  offset, 
  ordering
}: TCatalogListRequest): Promise<TCatalogListResponse> {

  try {

    const params = new URLSearchParams();

    if (type !== undefined) {
      params.append('type', type.toString());
    }

    if (limit !== undefined) {
      params.append('limit', limit.toString());
    }

    if (offset !== undefined) {
      params.append('offset', offset.toString());
    }

    if (genre !== undefined) {

      if (Array.isArray(genre)) {
        params.set('genre', genre.join(','));

      } else {
        params.set('genre', genre);
      }
    }

    if (kind !== undefined) {

      if (Array.isArray(kind)) {
        params.set('kind', kind.join(','));

      } else {
        params.set('kind', kind);
      }
    }

    if (ordering !== undefined) {
      params.append('ordering', ordering.toString());
    }

    const url = `${baseUrl}/v1/store/catalog/?${params.toString()}`;

    console.log('url:', `${baseUrl}/v1/store/catalog/?${params.toString()}`)

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка получения продуктов категории: ${type}`);
    }

    const products = await response.json();

    return products;

  } catch (error) {
    throw error;
  }
};