import { TArtistsListRequest, TArtistsListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getArtistsList({
  genre,
  limit, 
  offset, 
  ordering
}: TArtistsListRequest): Promise<TArtistsListResponse> {

  try {

    const params = new URLSearchParams();

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


    if (ordering !== undefined) {
      params.append('ordering', ordering.toString());
    }

    const url = `${baseUrl}/v1/artists/?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка получения списка артистов}`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    throw error;
  }
};