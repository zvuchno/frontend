import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { PaginatedStoreResponse } from "@/api/store/types";

import type {
  TAddImageRequest,
  TAddImageResponse,
  TCreateAlbumRequest,
  TCreateMerchRequest,
  TCreatePromocodeRequest,
  TDeleteImageRequest,
  TShowcaseAlbum,
  TShowcaseAlbumDetail,
  TShowcaseListRequest,
  TShowcaseMerch,
  TShowcaseMerchDetail,
  TShowcaseMerchRequest,
  TShowcasePromocode,
  TShowcasePromocodeDetail,
  TShowcasePromocodesRequest,
  TShowcaseTrack,
  TShowcaseTrackDetail,
  TShowcaseUpdateTrackInfoPayload,
  TUpdateAlbumRequest,
  TUpdateImageRequest,
  TUpdateMerchRequest,
  TUpdatePromocodeRequest,
  TUpdateTrackPayload,
  TUploadTrackPayload,
  TUploadTrackResponse,
} from "../model/types";
import { fillFormData } from "../utils/formDataHelper";

const baseUrl = "/api/backend";

//-------получение списка для витрины-------//
export async function getShowcaseAlbumsList({
  artist,
  url,
  artist_id,
  itemType,
}: TShowcaseListRequest): Promise<PaginatedStoreResponse<TShowcaseAlbum>> {
  const params = new URLSearchParams();
  if (artist) params.append("artist", artist.toString());
  if ((itemType === "album" || itemType === "products") && artist_id) {
    params.append("artist_id", artist_id.toString());
  }

  const mainUrl = `${baseUrl}/v1/store/albums?limit=15&${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  const response = await authFetchClient<PaginatedStoreResponse<TShowcaseAlbum>>(currentUrl, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить альбомы");

  return response;
}

export async function getShowcaseMerchList({
  artist,
  url,
  in_stock,
  artist_id,
  itemType,
}: TShowcaseMerchRequest): Promise<PaginatedStoreResponse<TShowcaseMerch>> {
  const params = new URLSearchParams();
  if (artist) params.append("artist", artist.toString());

  if (in_stock !== null && in_stock !== undefined) {
    params.append("in_stock", String(in_stock));
  }

  if ((itemType === "merch" || itemType === "products") && artist_id) {
    params.append("artist_id", artist_id.toString());
  }

  const mainUrl = `${baseUrl}/v1/store/merch?limit=15&${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  const response = await authFetchClient<PaginatedStoreResponse<TShowcaseMerch>>(currentUrl, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить мерч");

  return response;
}

export async function getShowcasePromocodes({
  url,
  discount_type,
  is_available,
  artist_id,
  itemType,
}: TShowcasePromocodesRequest): Promise<PaginatedStoreResponse<TShowcasePromocode>> {
  const params = new URLSearchParams();

  if (discount_type !== undefined && discount_type !== "ALL") {
    params.append("discount_type", String(discount_type));
  }

  if (is_available !== null && is_available !== undefined) {
    params.append("is_available", String(is_available));
  }

  if (itemType === "promo" && artist_id) params.append("artist_id", artist_id.toString());

  const mainUrl = `${baseUrl}/v1/store/promocodes?limit=15&${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  const response = await authFetchClient<PaginatedStoreResponse<TShowcasePromocode>>(currentUrl, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить промокоды");

  return response;
}

//-------удаление товара/промокода-------//
export async function deleteAlbum({ id }: { id: number }) {
  const url = `${baseUrl}/v1/store/albums/${id}`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  });
}

export async function deleteMerch({ id }: { id: number }): Promise<void> {
  const url = `${baseUrl}/v1/store/merch/${id}/`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  });
}

export async function deletePromocode({ id }: { id: number }): Promise<void> {
  const url = `${baseUrl}/v1/store/promocodes/${id}`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  });
}

//-------создание товара/промокода-------//
export async function createAlbum(payload: TCreateAlbumRequest): Promise<TShowcaseAlbumDetail> {
  const formData = new FormData();
  fillFormData(formData, payload);

  const url = `${baseUrl}/v1/store/albums`;

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "POST",
    body: formData,
  });

  if (!response) throw new Error("Не удалось создать альбом");

  return response;
}

export async function createMerch(payload: TCreateMerchRequest): Promise<TShowcaseMerchDetail> {
  const url = `${baseUrl}/v1/store/merch`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response) throw new Error("Не удалось создать мерч");

  return response;
}

export async function createPromocode(
  payload: TCreatePromocodeRequest
): Promise<TShowcasePromocodeDetail> {
  const url = `${baseUrl}/v1/store/promocodes`;

  const response = await authFetchClient<TShowcasePromocodeDetail>(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response) throw new Error("Не удалось создать промокод");

  return response;
}

//-------получение детальной информации о товаре/промокоде (для формы редактирования)-------//
export async function getDetailAlbum({ id }: { id?: number }): Promise<TShowcaseAlbumDetail> {
  const url = `${baseUrl}/v1/store/albums/${id}`;

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить альбом");

  return response;
}

export async function getDetailMerch({ id }: { id?: number }): Promise<TShowcaseMerchDetail> {
  const url = `${baseUrl}/v1/store/merch/${id}`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить мерч");

  return response;
}

export async function getDetailPromocode({
  id,
}: {
  id?: number;
}): Promise<TShowcasePromocodeDetail> {
  const url = `${baseUrl}/v1/store/promocodes/${id}`;

  const response = await authFetchClient<TShowcasePromocodeDetail>(url, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить промокод");

  return response;
}

//-------обновление товара/промокода-------//
export async function updateAlbum(data: TUpdateAlbumRequest): Promise<TShowcaseAlbumDetail> {
  const { id, payload } = data;
  const url = `${baseUrl}/v1/store/albums/${id}`;
  const formData = new FormData();
  fillFormData(formData, payload);

  const response = await authFetchClient<TShowcaseAlbumDetail>(url, {
    method: "PATCH",
    body: formData,
  });

  if (!response) throw new Error("Не удалось обновить альбом");

  return response;
}

export async function updateMerch(data: TUpdateMerchRequest): Promise<TShowcaseMerchDetail> {
  const { id, payload } = data;

  const url = `${baseUrl}/v1/store/merch/${id}`;

  const response = await authFetchClient<TShowcaseMerchDetail>(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response) throw new Error("Не удалось обновить мерч");

  return response;
}

export async function updatePromocode(
  data: TUpdatePromocodeRequest
): Promise<TShowcasePromocodeDetail> {
  const { id, payload } = data;

  const url = `${baseUrl}/v1/store/promocodes/${id}`;

  const response = await authFetchClient<TShowcasePromocodeDetail>(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response) throw new Error("Не удалось обновить промокод");

  return response;
}

//-------загрузка изображения для мерча-------//
export async function addImage(data: TAddImageRequest): Promise<TAddImageResponse> {
  const { id, payload } = data;
  const formData = new FormData();
  formData.append("image", payload.image);
  formData.append("is_main", String(payload.is_main));

  const url = `${baseUrl}/v1/store/merch/${id}/images/`;

  const response = await authFetchClient<TAddImageResponse>(url, {
    method: "POST",
    body: formData,
  });

  if (!response) throw new Error("Не добавить изображение");

  return response;
}

//-------обновлние изображений для мерча-------//
export async function updateImage(data: TUpdateImageRequest): Promise<TAddImageResponse> {
  const { id, payload } = data;
  const formData = new FormData();
  formData.append("image", payload.image);
  formData.append("is_main", String(payload.is_main));

  const url = `${baseUrl}/v1/store/merch/${id}/images/${payload.image_id}/`;

  const response = await authFetchClient<TAddImageResponse>(url, {
    method: "PATCH",
    body: formData,
  });

  if (!response) throw new Error("Не удалось обновить изображение");

  return response;
}

//-------удаление изображений для мерча-------//
export async function deleteImage(data: TDeleteImageRequest): Promise<void> {
  const { id, image_id } = data;

  const url = `${baseUrl}/v1/store/merch/${id}/images/${image_id}/`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  });
}

//-------Треки-------//
export async function getShowcaseTracksList({
  album,
  url,
}: {
  album?: number;
  url?: string;
}): Promise<PaginatedStoreResponse<TShowcaseTrack>> {
  const params = new URLSearchParams();
  if (album) params.append("album", album.toString());

  const mainUrl = `${baseUrl}/v1/store/tracks?${params.toString()}`;
  const currentUrl = url ? url : mainUrl;

  const response = await authFetchClient<PaginatedStoreResponse<TShowcaseTrack>>(currentUrl, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить треки");

  return response;
}

export async function getDetailTrack({ id }: { id?: number }): Promise<TShowcaseTrackDetail> {
  const url = `${baseUrl}/v1/store/tracks/${id}`;

  const response = await authFetchClient<TShowcaseTrackDetail>(url, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить трек");

  return response;
}

export async function deleteTrack({ id }: { id: number }): Promise<void> {
  const url = `${baseUrl}/v1/store/tracks/${id}/`;

  await authFetchClient<void>(url, {
    method: "DELETE",
  });
}

export async function updateTrackInfo(
  data: TShowcaseUpdateTrackInfoPayload
): Promise<TShowcaseTrackDetail> {
  const { id, ...payload } = data;

  const url = `${baseUrl}/v1/store/tracks/${id}`;

  const response = await authFetchClient<TShowcaseTrackDetail>(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response) throw new Error("Не удалось обновить трек");

  return response;
}

export async function directUploadTrack(file: File, data: TUploadTrackPayload) {
  const { album_id, ...payload } = data;

  const url = `${baseUrl}/v1/store/albums/${album_id}/track-uploads/initiate`;

  const response = await authFetchClient<TUploadTrackResponse>(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response) throw new Error("Не удалось инициировать загрузку трека");

  const transport = response.upload.transport;
  const formData = new FormData();

  Object.entries(transport.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append(transport.file_field_name, file);

  const headers: HeadersInit = {};
  if (transport.headers) {
    Object.entries(transport.headers).forEach(([k, v]) => {
      headers[k] = v;
    });
  }

  const uploadRes = await fetch(transport.url, {
    method: transport.method || "POST",
    body: formData,
    headers,
  });

  if (!uploadRes.ok) throw new Error("Ошибка загрузки файла на транспорт");

  const responseUrl = response.upload.complete_url;
  const newUrl = new URL(responseUrl);
  const pathAfterApi = newUrl.pathname.replace(/^\/api/, "");

  const res = await authFetchClient<void>(`${baseUrl}${pathAfterApi}`, {
    method: "POST",
  });

  if (res)
    await authFetchClient<TUploadTrackResponse>(
      `${baseUrl}/v1/store/track-uploads/${response.upload.id}/complete`, 
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
}

export async function directUpdateTrack(file: File, data: TUpdateTrackPayload) {
  const { track_id, ...payload } = data;

  const url = `${baseUrl}/v1/store/tracks/${track_id}/file-upload/initiate/`;

  const response = await authFetchClient<TUploadTrackResponse>(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response) throw new Error("Не удалось инициировать загрузку трека");

  const transport = response.upload.transport;
  const formData = new FormData();

  Object.entries(transport.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append(transport.file_field_name, file);

  const headers: HeadersInit = {};
  if (transport.headers) {
    Object.entries(transport.headers).forEach(([k, v]) => {
      headers[k] = v;
    });
  }

  const uploadRes = await fetch(transport.url, {
    method: transport.method || "POST",
    body: formData,
    headers,
  });
  if (!uploadRes.ok) throw new Error("Ошибка загрузки файла на транспорт");
  await authFetchClient<void>(response.upload.complete_url, {
    method: "POST",
  });

  // if (res) await authFetchClient<TUploadTrackResponse>(
  //   `${baseUrl}/v1/store/track-uploads/${response.upload.id}/complete/`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify(payload)
  //   }, token);
}
