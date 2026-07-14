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

export type TDaDataResponse = {
  suggestions: TAddressSuggestion[];
};