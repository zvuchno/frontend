import { getApiAccessToken } from "@/api/authToken";

import type { TAddressSuggestion, TDaDataResponse } from "../model/types";

export type TCdekData = {
  delivery_type: "offices" | "door";
  city_code: number;
};

export type TCdekPickupDetailsResponse = {
  delivery_sum: number;
  period_min: number;
  period_max: number;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

const daDataApiKey = process.env.NEXT_PUBLIC_DADATA_API_KEY;

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

  const response = await fetch(`${baseUrl}/v1/store/cdek-calculate`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error("Ошибка расчета стоимости доставки");
  }
  return (await response.json()) as TCdekPickupDetailsResponse;
}

// справочник населенных пунктов DaData
export async function choseLocation(location: string): Promise<TAddressSuggestion[] | undefined> {
  try {
    const response = await fetch(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${daDataApiKey ?? ""}`,
        },
        body: JSON.stringify({
          query: location,
          from_bound: { value: "city" },
          to_bound: { value: "settlement" },
          restrict_value: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = (await response.json()) as TDaDataResponse;

    return result.suggestions;
  } catch (error) {
    console.error("error", error);
    return undefined;
  }
}
