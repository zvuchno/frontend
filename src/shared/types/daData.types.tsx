export type TAddressSuggestion = {
  value: string;
  unrestricted_value: string;
  data: {
    city: string | null;
    city_fias_id: string | null;
    fias_id: string | null;
    kladr_id: string | null;
    region_with_type: string | null;
    settlement_with_type: string | null;
    street_with_type: string | null;
    house: string | null;
    block: string | null;
    flat: string | null;
  };
};

/*export type TDaDataResponse = extends <T,>{
  suggestions: TAddressSuggestion[];
};*/

// response CITY (из СДЕКА)
export type TDaDataCitySuggestion = {
  city_uuid: string;
  code: number;
  full_name: string;
  country_code: string;
};

export type TDadataBound = "street" | "house" | "flat";

// запрос номеров квартир, домов, улиц из DaData
export type TDadataRequest = {
  location: string;
  fiasId: string;
  city?: string;
  street?: string;
};

// response DaData (улица / дом / квартира)
export type TDadataResponse = {
  data?: {
    fias_id?: string;
  };
  value: string;
};
