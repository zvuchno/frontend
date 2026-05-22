import { ListMerchResponse } from "./listMerch.types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getListMerch(
  limit?: number, 
  offset?: number
): Promise<ListMerchResponse> {

  const params = new URLSearchParams();

  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }

  if (offset !== undefined) {
    params.append('offset', offset.toString());
  }

  const url = `${baseUrl}/v1/store/merch/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch merch data");
  }

  return response.json();
};