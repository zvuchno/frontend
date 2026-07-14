import type { TAddressSuggestion, TDaDataResponse } from "../types/TAddressSuggestion.types";

const daDataApiKey = process.env.NEXT_PUBLIC_DADATA_API_KEY;

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
