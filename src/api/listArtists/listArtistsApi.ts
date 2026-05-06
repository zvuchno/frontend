import { ListArtistsResponse } from "./listArtistsApi.types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getListArtists(
  limit?: number, 
  offset?: number
): Promise<ListArtistsResponse> {

  const params = new URLSearchParams();

  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }

  if (offset !== undefined) {
    params.append('offset', offset.toString());
  }

  const url = `${baseUrl}/v1/artists/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch artists data");
  }

  return response.json();
};