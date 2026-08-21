import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import {
  type TPVZOfficeMe,
  type TPickupPointMe,
  type TSupportSettings,
  type TTelegramBotConnectResponse,
} from "../model/artistSettings.types";

const baseUrl = "/api/backend";

//-------------- подключение артиста к телеграм-боту --------------------------------
export async function connectTelegramBot(): Promise<TTelegramBotConnectResponse> {
  const response = await authFetchClient<TTelegramBotConnectResponse>(
    `${baseUrl}/v1/artists/me/telegram/connect`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response) {
    throw new Error(`Ошибка подключения телеграм-бота`);
  }

  return response;
}

//---------------- настройка информации о пунктах самовывоза артиста --------------
async function setPickupPointsMe<T>({
  apiMethod,
  errorMessage,
  pickupPoints,
  id,
}: {
  apiMethod: "GET" | "POST" | "PATCH" | "DELETE";
  errorMessage: string;
  pickupPoints?: TPickupPointMe | TPickupPointMe[];
  id?: number;
}): Promise<T> {
  const url = id
    ? `${baseUrl}/v1/artists/me/pickup-points/${id}`
    : `${baseUrl}/v1/artists/me/pickup-points`;
  const response = await authFetchClient<T>(url, {
    method: apiMethod,
    body: pickupPoints && JSON.stringify(pickupPoints),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response) {
    throw new Error(errorMessage);
  }

  return response;
}

// актуальные пункты самовывоза для артиста
export async function receivePickupPointsMe() {
  return await setPickupPointsMe<TPickupPointMe[]>({
    apiMethod: "GET",
    errorMessage: "Ошибка получения пунктов самовывоза",
  });
}

// добавить пункт самовывоза для артиста
export async function addPickupPointMe(pickupPoint: TPickupPointMe) {
  return await setPickupPointsMe<TPickupPointMe>({
    apiMethod: "POST",
    errorMessage: "Ошибка добавления пункта самовывоза",
    pickupPoints: pickupPoint,
  });
}

//отредактировать существующий пункт самовывоза для артиста
export async function changePickupPointMe(pickupPoint: TPickupPointMe) {
  return await setPickupPointsMe<TPickupPointMe>({
    apiMethod: "PATCH",
    errorMessage: "Ошибка изменения пункта самовывоза",
    pickupPoints: pickupPoint,
    id: pickupPoint.id,
  });
}

//удалить пункт самовывоза для артиста
export async function deletePickupPointMe(id: number): Promise<void> {
  await authFetchClient<void>(`${baseUrl}/v1/artists/me/pickup-points/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

//---------------- настройка информации о ПВЗ артиста для отправки товара --------------
async function setPVZOfficeMe<T>({
  apiMethod,
  errorMessage,
  payload,
}: {
  apiMethod: "GET" | "PUT" | "DELETE";
  errorMessage: string;
  payload?: TPVZOfficeMe;
}): Promise<T> {
  const response = await authFetchClient<T>(`${baseUrl}/v1/artists/me/shipping-point`, {
    method: apiMethod,
    body: payload && JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response) {
    throw new Error(errorMessage);
  }

  return response;
}

//получить информацию о выбраном ПВЗ для доставки товаров артистом
export async function receivePVZMe() {
  return await setPVZOfficeMe<TPVZOfficeMe>({
    apiMethod: "GET",
    errorMessage: "Ошибка получения информации о ПВЗ артиста",
  });
}

//изменить/добавить информацию о ПВЗ для доставки товаров артистом
export async function createPVZMe(pvz: TPVZOfficeMe) {
  return await setPVZOfficeMe<TPVZOfficeMe>({
    apiMethod: "PUT",
    errorMessage: "Ошибка настройки информации о ПВЗ артиста",
    payload: pvz,
  });
}

//удалить информацию о ПВЗ для доставки товаров артистом
export async function deletePVZMe(): Promise<void> {
  await authFetchClient<void>(`${baseUrl}/v1/artists/me/shipping-point`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

//---------------- настройка информации о контактах поддержки / для возвратов  --------------
async function setSupportSettingsMe<T>({
  apiMethod,
  errorMessage,
  payload,
}: {
  apiMethod: "GET" | "PUT";
  errorMessage: string;
  payload?: TSupportSettings;
}): Promise<T> {
  const response = await authFetchClient<T>(`${baseUrl}/v1/artists/me/store-settings`, {
    method: apiMethod,
    body: payload && JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response) {
    throw new Error(errorMessage);
  }

  return response;
}

//получить информацию о своих контактах поддержки покупателей
export async function receiveSupportData() {
  return await setSupportSettingsMe<TSupportSettings>({
    apiMethod: "GET",
    errorMessage: "Ошибка получения контактной информации",
  });
}

//изменить/добавить/удалить информацию о своих контактах поддержки покупателей
export async function manageSupportData(contacts: TSupportSettings) {
  return await setSupportSettingsMe<TSupportSettings>({
    apiMethod: "PUT",
    errorMessage: "Ошибка настройки контактной информации артиста",
    payload: contacts,
  });
}
