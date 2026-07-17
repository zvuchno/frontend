import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

//import { getApiAccessToken } from "@/api/authToken";

import type { TCdekData, TCdekPickupDetailsResponse } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export type TCdekCity = {
  city_uuid: string; //"770f3275-921b-4552-a856-a16697d45691"
  code: number; // 288
  full_name: string; // "Владивосток, Владивостокский городской округ, Приморский край, Россия"
  country_code: string; // "RU"
};

// справочник населенных пунктов из справочника ПВЗ СДЕК (если есть ПВЗ)
export async function getCdekCities(location: string, token?: string): Promise<TCdekCity[]> {
  //const token = await getApiAccessToken();

  /*const init: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };*/

  const response = await authFetchClient<TCdekCity[]>(
    `${baseUrl}/v1/store/cdek-cities?query=${location}`,
    {
      method: "GET",
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error("Населенный пункт СДЕК не найден");
  }
  return response;
}

// запрос рассчета стоимости доставки в выбранный пвз
export async function calculateCdekDelivery(
  cdekData: TCdekData,
  token?: string
): Promise<TCdekPickupDetailsResponse> {
  //const token = await getApiAccessToken();

  /*const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cdekData),
    credentials: "include",
  };*/

  const response = await authFetchClient<TCdekPickupDetailsResponse>(
    `${baseUrl}/v1/store/cdek-calculate/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cdekData),
      credentials: "include",
    },
    token
  );

  if (!response) {
    throw new Error("Ошибка расчета стоимости доставки");
  }
  return response;
}
