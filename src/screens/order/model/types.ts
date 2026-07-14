import { type HTMLInputTypeAttribute } from "react";

export interface FieldValues {
  full_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  personal_data_consent?: boolean;
  cdek_city_code?: string;
  tariffs?: string;
  delivery_point?: string;
  pickup_point?: number;
  delivery?: number;
}

export type TOrderPersonalFormField = {
  title: string;
  name: keyof FieldValues;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  disabled?: boolean;
  row: number;
  column: number;
  maxLength?: number;
  minLength?: number;
  options?: { label: string; value: string }[];
};
