import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import type { TCdekData, TCdekPickupDetailsResponse } from "../model/types";

const baseUrl = "/api/backend";

export type TCdekCity = {
  city_uuid: string; //"770f3275-921b-4552-a856-a16697d45691"
  code: number; // 288
  full_name: string; // "Владивосток, Владивостокский городской округ, Приморский край, Россия"
  country_code: string; // "RU"
};

// справочник населенных пунктов из справочника ПВЗ СДЕК (если есть ПВЗ)
export async function getCdekCities(location: string): Promise<TCdekCity[]> {
  const response = await authFetchClient<TCdekCity[]>(
    `${baseUrl}/v1/store/cdek-cities?query=${location}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response) {
    throw new Error("Населенный пункт СДЕК не найден");
  }
  return response;
}

// запрос рассчета стоимости доставки в выбранный пвз
export async function calculateCdekDelivery(
  cdekData: TCdekData
): Promise<TCdekPickupDetailsResponse> {
  const response = await authFetchClient<TCdekPickupDetailsResponse>(
    `${baseUrl}/v1/store/cdek-calculate/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cdekData),
      credentials: "include",
    }
  );

  if (!response) {
    throw new Error("Ошибка расчета стоимости доставки");
  }
  return response;
}
