import { ListAlbumsResponse } from "./listAlbums.types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getListAlbums(
  limit?: number, 
  offset?: number
): Promise<ListAlbumsResponse> {

  const params = new URLSearchParams();

  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }

  if (offset !== undefined) {
    params.append('offset', offset.toString());
  }

  const url = `${baseUrl}/v1/store/albums/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch artists data");
  }

  return response.json();
};