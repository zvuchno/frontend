import type { TDadataBound, TDadataRequest, TDadataResponse } from "../types/daData.types";

const daDataApiKey = process.env.NEXT_PUBLIC_DADATA_API_KEY;

const createDadataInit = (data: TDadataRequest, boundType: TDadataBound) => {
  let dadataLocations;

  switch (boundType) {
    case "flat":
      dadataLocations = [{ house_fias_id: data.fiasId }];
      break;
    case "house":
      dadataLocations = data.fiasId
        ? [{ street_fias_id: data.fiasId }]
        : [{ city: data.city, street: data.street }];
      break;
    case "street":
      dadataLocations = data.fiasId ? [{ fias_id: data.fiasId }] : [{ city: data.city }];
      break;
  }

  return {
    query: data.location,
    locations: dadataLocations,
    from_bound: { value: boundType },
    to_bound: { value: boundType },
    restrict_value: true,
  };
};

// справочник DaData - поиск по улицам или домам или квартирам
export async function getDadataSuggestions(
  data: TDadataRequest,
  boundType: TDadataBound
): Promise<TDadataResponse[] | undefined> {
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
        body: JSON.stringify(createDadataInit(data, boundType)),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = (await response.json()) as { suggestions: TDadataResponse[] };

    return result.suggestions || [];
  } catch (error) {
    console.error("error", error);
    return undefined;
  }
}

// запрос fias_id населенного пункта из DaData для последующего использования для поиска улиц, домов и пр
export async function getFiasIdByCityName(cityName: string) {
  try {
    const response = await fetch(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${daDataApiKey ?? ""}`,
        },
        body: JSON.stringify({
          query: cityName,
          count: 1,
        }),
      }
    );

    return (await response.json()) as {
      suggestions: Array<{
        data: {
          fias_id: string;
          city_fias_id?: string;
          region_fias_id?: string;
        };
      }>;
    };
  } catch (error) {
    console.error("Не удалось сопоставить UUID СДЭК с ФИАС DaData:", error);
  }
}
