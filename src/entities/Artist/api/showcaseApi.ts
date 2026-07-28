import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { PaginatedStoreResponse } from "@/api/store/types";
import type { 
  TShowcaseAlbum, 
  TShowcaseAlbumDetail, 
  TShowcaseCreateAlbumRequest, 
  TShowcaseCreateMerchRequest, 
  TShowcaseListRequest, 
  TShowcaseMerch, 
  TShowcaseMerchDetail, 
  TShowcaseMerchRequest, 
  TShowcasePromocode, 
  TShowcasePromocodeDetail, 
  TShowcasePromocodesRequest, 
  TShowcaseUpdateAlbumRequest,
  TShowcaseUpdateMerchRequest,
  TShowcaseUpdatePromocodeRequest
} from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function getShowcaseAlbumsList({
  token,
  artist,
  url,
}: TShowcaseListRequest): Promise<PaginatedStoreResponse<TShowcaseAlbum>> {
  const params = new URLSearchParams();
  params.append("artist", artist.toString());

  const mainUrl = `${baseUrl}/v1/store/albums/?limit=6&${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  const response = await authFetchClient<PaginatedStoreResponse<TShowcaseAlbum>>(currentUrl, {
    method: "GET",
  }, token);

  if (!response) throw new Error('Не удалось получить альбомы')

  return response;
};

export async function getShowcaseMerchList({
  token,
  artist,
  url,
  in_stock,
}: TShowcaseMerchRequest): Promise<PaginatedStoreResponse<TShowcaseMerch>> {
  const params = new URLSearchParams();
  params.append("artist", artist.toString());

  if (in_stock !== null && in_stock !== undefined) {
    params.append('in_stock', String(in_stock));
  }

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
  discount_type,
  is_available
}: TShowcasePromocodesRequest): Promise<PaginatedStoreResponse<TShowcasePromocode>> {
  const params = new URLSearchParams();

  if (discount_type !== undefined && discount_type !== 'ALL') {
    params.append('discount_type', String(discount_type));
  }

  if (is_available !== null && is_available !== undefined) {
    params.append('in_stock', String(is_available));
  }

  const mainUrl = `${baseUrl}/v1/store/promocodes/?limit=6&${params.toString()}`;
  const currentUrl = url ? url : mainUrl;


  const response = await authFetchClient<PaginatedStoreResponse<TShowcasePromocode>>(currentUrl, {
    method: "GET",
  }, token);

  if (!response) throw new Error('Не удалось получить альбомы')

  return response;
};

export async function togglePublishedAlbum({
  token,
  id,
  is_published
}: TShowcaseUpdateAlbumRequest): Promise<TShowcaseAlbumDetail> {

  const url = `${baseUrl}/v1/store/albums/${id}`;

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "PATCH",
    body: JSON.stringify({ is_published })
  }, token);

  if (!response) throw new Error('Не удалось обновить альбом')

  return response;
};

export async function togglePublishedMerch({
  token,
  id,
  is_published
}: TShowcaseUpdateMerchRequest): Promise<TShowcaseMerchDetail> {

  const url = `${baseUrl}/v1/store/merch/${id}`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "PATCH",
    body: JSON.stringify({ is_published })
  }, token);

  if (!response) throw new Error('Не удалось обновить мерч')

  return response;
};

export async function toggleEnabledPromocode({
  token,
  id,
  is_enabled
}: TShowcaseUpdatePromocodeRequest): Promise<TShowcasePromocodeDetail> {

  const url = `${baseUrl}/v1/store/promocodes/${id}`;

  const response = await authFetchClient<TShowcasePromocodeDetail>(url, {
    method: "PATCH",
    body: JSON.stringify({ is_enabled })
  }, token);

  if (!response) throw new Error('Не удалось обновить промокод');

  return response;
};

export async function deleteAlbum({
  token,
  id,
}: {
  token: string | undefined;
  id: number;
}): Promise<void> {
  const url = `${baseUrl}/v1/store/albums/${id}`;

  const response = await authFetchClient<void>(url, {
    method: "DELETE",
  }, token);

  if (!response) throw new Error('Не удалось удалить альбом')

  return response;
};

export async function deleteMerch({
  token,
  id,
}: {
  token: string | undefined;
  id: number;
}): Promise<void> {
  const url = `${baseUrl}/v1/store/merch/${id}`;

  const response = await authFetchClient<void>(url, {
    method: "DELETE",
  }, token);

  if (!response) throw new Error('Не удалось удалить мерч')

  return response;
};

export async function deletePromocode({
  token,
  id,
}: {
  token: string | undefined;
  id: number;
}): Promise<void> {
  const url = `${baseUrl}/v1/store/promocodes/${id}`;

  const response = await authFetchClient<void>(url, {
    method: "DELETE",
  }, token);

  if (!response) throw new Error('Не удалось удалить промокод')

  return response;
};

export async function createAlbum(token: string | undefined, formData: FormData): Promise<TShowcaseAlbumDetail> {

  const url = `${baseUrl}/v1/store/albums/`;

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "POST",
    body: formData
  }, token);

  if (!response) throw new Error('Не удалось создать альбом')

  return response;
};

export async function createMerch(payload: TShowcaseCreateMerchRequest): Promise<TShowcaseMerchDetail> {
  const {  token, ...otherProperties} = payload;

  const url = `${baseUrl}/v1/store/merch/`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "POST",
    body: JSON.stringify(otherProperties)
  }, token);

  if (!response) throw new Error('Не удалось создать мерч')

  return response;
};