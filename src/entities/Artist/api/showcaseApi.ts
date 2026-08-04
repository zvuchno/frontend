import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { PaginatedStoreResponse } from "@/api/store/types";
import type { 
  TShowcaseAlbum, 
  TShowcaseAlbumDetail,
  TCreateMerchRequest, 
  TShowcaseListRequest, 
  TShowcaseMerch, 
  TShowcaseMerchDetail, 
  TShowcaseMerchRequest, 
  TShowcasePromocode, 
  TShowcasePromocodeDetail, 
  TShowcasePromocodesRequest,
  TUpdateAlbumRequest,
  TUpdateMerchRequest,
  TUpdatePromocodeRequest,
  TCreateAlbumRequest,
  TAddImageRequest,
  TAddImageResponse,
  TUpdateImageRequest,
  TDeleteImageRequest,
} from "../model/types";
import { fillFormData } from "@/features/showcaseUpload";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

//-------получение списка для витрины-------//
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


//-------удаление товара/промокода-------//
export async function deleteAlbum({
  token,
  id,
}: {
  token: string | undefined;
  id: number;
}) {
  const url = `${baseUrl}/v1/store/albums/${id}`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  }, token);
};

export async function deleteMerch({
  token,
  id,
}: {
  token: string | undefined;
  id: number;
}): Promise<void> {
  const url = `${baseUrl}/v1/store/merch/${id}/`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  }, token);
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

//-------создание товара/промокода-------//
export async function createAlbum(token: string | undefined, payload: TCreateAlbumRequest): Promise<TShowcaseAlbumDetail> {
  const formData = new FormData();
  fillFormData(formData, payload);

  const url = `${baseUrl}/v1/store/albums/`;

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "POST",
    body: formData
  }, token);

  if (!response) throw new Error('Не удалось создать альбом')

  return response;
};

export async function createMerch(token: string | undefined, payload: TCreateMerchRequest): Promise<TShowcaseMerchDetail> {
  const url = `${baseUrl}/v1/store/merch/`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "POST",
    body: JSON.stringify(payload)
  }, token);

  if (!response) throw new Error('Не удалось создать мерч')

  return response;
};

//-------получение детальной информации о товаре/промокоде (для формы редактирования)-------//
export async function getDetailAlbum({
  token,
  id
}: {
  token: string | undefined;
  id?: number;
}): Promise<TShowcaseAlbumDetail> {
  const url = `${baseUrl}/v1/store/albums/${id}`;

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "GET",
  }, token);

  if (!response) throw new Error('Не удалось получить альбом')

  return response;
};

export async function getDetailMerch({
  token,
  id
}: {
  token: string | undefined;
  id?: number;
}): Promise<TShowcaseMerchDetail> {
  const url = `${baseUrl}/v1/store/merch/${id}`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "GET",
  }, token);

  if (!response) throw new Error('Не удалось получить мерч')

  return response;
};

//-------обновление товара/промокода-------//
export async function updateAlbum(data: TUpdateAlbumRequest): Promise<TShowcaseAlbumDetail> {
  const { token, id, payload } = data;
  const url = `${baseUrl}/v1/store/albums/${id}`;
  const formData = new FormData();
  fillFormData(formData, payload);

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "PATCH",
    body: formData
  }, token);

  if (!response) throw new Error('Не удалось обновить альбом')

  return response;
};

export async function updateMerch(data: TUpdateMerchRequest): Promise<TShowcaseMerchDetail> {
  const { token, id, payload } = data;

  const url = `${baseUrl}/v1/store/merch/${id}`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "PATCH",
    body: JSON.stringify(payload)
  }, token);

  if (!response) throw new Error('Не удалось обновить мерч')

  return response;
};

export async function updatePromocode(data: TUpdatePromocodeRequest): Promise<TShowcasePromocodeDetail> {
  const { token, id, payload } = data;

  const url = `${baseUrl}/v1/store/promocodes/${id}`;

  const response = await authFetchClient<TShowcasePromocodeDetail>(url, {
    method: "PATCH",
    body: JSON.stringify(payload)
  }, token);

  if (!response) throw new Error('Не удалось обновить промокод');

  return response;
};

//-------загрузка изображения для мерча-------//
export async function addImage(data: TAddImageRequest): Promise<TAddImageResponse> {
  const { token, id, payload } = data;
  const formData = new FormData();
  formData.append('image', payload.image);
  formData.append('is_main', String(payload.is_main));

  const url = `${baseUrl}/v1/store/merch/${id}/images/`;

  const response = await authFetchClient<TAddImageResponse>(url, {
    method: "POST",
    body: formData
  }, token);

  if (!response) throw new Error('Не добавить изображение')

  return response;
};

//-------обновлние изображений для мерча-------//
export async function updateImage(data: TUpdateImageRequest): Promise<TAddImageResponse> {
  const { token, id, payload } = data;
  const formData = new FormData();
  formData.append('image', payload.image);
  formData.append('is_main', String(payload.is_main));

  const url = `${baseUrl}/v1/store/merch/${id}/images/${payload.image_id}/`;

  const response = await authFetchClient<TAddImageResponse>(url, {
    method: "PATCH",
    body: formData
  }, token);

  if (!response) throw new Error('Не удалось обновить изображение')

  return response;
};

//-------удаление изображений для мерча-------//
export async function deleteImage(token: string | undefined, data: TDeleteImageRequest): Promise<void> {
  const { id, image_id } = data;

  const url = `${baseUrl}/v1/store/merch/${id}/images/${image_id}/`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  }, token);
};