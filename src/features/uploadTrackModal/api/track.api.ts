import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type { 
  TShowcaseTrackDetail, 
  TShowcaseUpdateTrackInfoPayload, 
  TUpdateTrackPayload, 
  TUploadTrackPayload, 
  TUploadTrackResponse 
} from "../model/types";

const baseUrl = "/api/backend";

export async function getDetailTrack({ id }: { id?: number }): Promise<TShowcaseTrackDetail> {
  const url = `${baseUrl}/v1/store/tracks/${id}`;

  const response = await authFetchClient<TShowcaseTrackDetail>(url, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить трек");

  return response;
};

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
};

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
};