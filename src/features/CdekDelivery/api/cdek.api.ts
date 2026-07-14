import { getApiAccessToken } from "@/api/authToken";

import type { TCdekData, TCdekPickupDetailsResponse } from "../model/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export type TCdekCity = {
  city_uuid: string; //"770f3275-921b-4552-a856-a16697d45691"
  code: number; // 288
  full_name: string; // "Владивосток, Владивостокский городской округ, Приморский край, Россия"
  country_code: string; // "RU"
};

// справочник населенных пунктов из справочника ПВЗ СДЕК (если есть ПВЗ)
export async function getCdekCities(location: string): Promise<TCdekCity[]> {
  const token = await getApiAccessToken();

  const init: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  const response = await fetch(`${baseUrl}/v1/store/cdek-cities?query=${location}`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error("Населенный пункт СДЕК не найден");
  }
  return (await response.json()) as TCdekCity[];
}

// запрос расечта стоимости доставки в выбранный пвз
export async function calculateCdekDelivery(
  cdekData: TCdekData
): Promise<TCdekPickupDetailsResponse> {
  const token = await getApiAccessToken();

  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cdekData),
    credentials: "include",
  };

  const response = await fetch(`${baseUrl}/v1/store/cdek-calculate/`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error("Ошибка расчета стоимости доставки");
  }
  return (await response.json()) as TCdekPickupDetailsResponse;
}
