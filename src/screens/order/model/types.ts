import { HTMLInputTypeAttribute } from "react";

export interface FieldValues {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  street?: string;
  building?: string;
  apartment?: string;
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
