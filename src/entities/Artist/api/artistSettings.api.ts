import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import {
  type TPickupSettings,
  type TShippingSettings,
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
  pickupSettings,
  id,
}: {
  apiMethod: "GET" | "POST" | "DELETE";
  errorMessage: string;
  pickupSettings?: Partial<TPickupSettings>;
  id?: number;
}): Promise<T> {
  const url = id
    ? `${baseUrl}/v1/artists/me/pickup-points/${id}`
    : `${baseUrl}/v1/artists/me/pickup-points`;
  const response = await authFetchClient<T>(url, {
    method: apiMethod,
    body: pickupSettings && JSON.stringify(pickupSettings),
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
  return await setPickupPointsMe<Partial<TPickupSettings>>({
    apiMethod: "GET",
    errorMessage: "Ошибка получения информации о пунктах самовывоза",
  });
}

// добавить/изменить/удалить (is_active=false) информацию о пунктах самовывоза для артиста
export async function managePickupPointMe(pickupSettings: Partial<TPickupSettings>) {
  return await setPickupPointsMe<Partial<TPickupSettings>>({
    apiMethod: "POST",
    errorMessage: "Ошибка изменениния информации о пунктах самовывоза",
    pickupSettings: pickupSettings,
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
  payload?: TShippingSettings;
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
export async function receivePVZMe(): Promise<Partial<TShippingSettings> | null> {
  return authFetchClient<Partial<TShippingSettings>>(`${baseUrl}/v1/artists/me/shipping-point`, {
    method: "GET",
    credentials: "include",
  });
}

//изменить/добавить информацию о ПВЗ для доставки товаров артистом
export async function managePVZMe(pvzSettings: Partial<TShippingSettings>) {
  return await setPVZOfficeMe<Partial<TShippingSettings>>({
    apiMethod: "PUT",
    errorMessage: "Ошибка настройки информации о ПВЗ артиста",
    payload: pvzSettings,
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
/*async function setStoreSettingsMe<T>({
  apiMethod,
  errorMessage,
  payload,
}: {
  apiMethod: "GET" | "PUT";
  errorMessage: string;
  payload?: TStoreSettings;
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
export async function receiveStoreSettings() {
  return await setStoreSettingsMe<TStoreSettings>({
    apiMethod: "GET",
    errorMessage: "Ошибка получения настроек артиста",
  });
}

//изменить/добавить/удалить информацию о своих контактах поддержки покупателей
export async function manageStoreSettings(contacts: TStoreSettings) {
  return await setStoreSettingsMe<TStoreSettings>({
    apiMethod: "PUT",
    errorMessage: "Ошибка изменения настроек артиста",
    payload: contacts,
  });
}
  */
