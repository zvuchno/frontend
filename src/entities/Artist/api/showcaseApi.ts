import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import { PaginatedStoreResponse } from "@/api/store/types";
import { TShowcaseAlbums, TShowcaseListRequest, TShowcaseMerch, TShowcasePromocodes, TShowcasePromocodesRequest } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getShowcaseAlbumsList({
  token,
  artist,
  url,
}: TShowcaseListRequest): Promise<PaginatedStoreResponse<TShowcaseAlbums>> {
  const params = new URLSearchParams();
  params.append("artist", artist.toString());

  const mainUrl = `${baseUrl}/v1/store/albums/?limit=6&${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  const response = await authFetchClient<PaginatedStoreResponse<TShowcaseAlbums>>(currentUrl, {
    method: "GET",
  }, token);

  if (!response) throw new Error('Не удалось получить альбомы')

  return response;
};

export async function getShowcaseMerchList({
  token,
  artist,
  url,
}: TShowcaseListRequest): Promise<PaginatedStoreResponse<TShowcaseMerch>> {
  const params = new URLSearchParams();
  params.append("artist", artist.toString());

  const mainUrl = `${baseUrl}/v1/store/merch/?limit=6&${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  const response = await authFetchClient<PaginatedStoreResponse<TShowcaseMerch>>(currentUrl, {
    method: "GET",
  }, token);

  if (!response) throw new Error('Не удалось получить альбомы')

  return response;
};

export async function getShowcasePromocodes({
  token,
  url,
}: TShowcasePromocodesRequest): Promise<PaginatedStoreResponse<TShowcasePromocodes>> {

  const mainUrl = `${baseUrl}/v1/store/promocodes/?limit=6`;
  const currentUrl = url ? url : mainUrl;


  const response = await authFetchClient<PaginatedStoreResponse<TShowcasePromocodes>>(currentUrl, {
    method: "GET",
  }, token);

  if (!response) throw new Error('Не удалось получить альбомы')

  return response;
};