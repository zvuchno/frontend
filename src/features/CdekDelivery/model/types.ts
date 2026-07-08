export type TCdekTariffDetails = {
  tariff_code: number;
  tariff_name: string;
  tariff_description: string;
  delivery_mode: number;
  delivery_sum: number;
  period_min: number;
  period_max: number;
  calendar_min: number;
  calendar_max: number;
  delivery_date_range: {
    min: string;
    max: string;
  };
};

export type TCdekTariffs = {
  office: TCdekTariffDetails[];
  door: TCdekTariffDetails[];
  pickup: TCdekTariffDetails[];
};

export type TCdekTariffPlans = {
  tariff_codes: TCdekTariffDetails[];
};

export type TCdekDeliveryAddress = {
  code?: number; // код города выбранного пвз (если выбрана доставка до ПВЗ)
  address?: string; // заполняется при выборе доставки до адреса
};

export type TCdekDeliveryOption = "door" | "office";

export type TCdekOfficeAddress = {
  city_code: number;
  city: string;
  type: string;
  postal_code: string;
  country_code: string;
  have_cashless: boolean;
  have_cash: boolean;
  allowed_cod: boolean;
  is_dressing_room: boolean;
  code: string;
  name: string;
  address: string;
  work_time: string;
  location: number[];
};

export type TCdekDoorAddress = {
  name: string;
  position: number[];
  kind: string;
  precision: string;
  formatted: string;
  postal_code: string;
  country_code: string;
  city: string;
};

export type TAddressSuggestion = {
  value: string;
  unrestricted_value: string;
  data: {
    city: string | null;
    city_fias_id: string | null;
    fias_id: string | null;
    kladr_id: string | null;
    settlement: string | null;
  };
};

export type TDaDataResponse = {
  suggestions: TAddressSuggestion[];
};

export interface WidgetCdekProps {
  cityName: string;
  isDeliveryChosen: (isChosen: boolean) => void;
}
