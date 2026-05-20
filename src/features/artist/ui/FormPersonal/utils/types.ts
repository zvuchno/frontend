import {
  TArtistLegalData,
  TArtistLegalDataForApi,
  TBankData,
  TCompanyData,
  TIdentityData,
  TLegalProfile,
} from "@/entities/Artist/store/types";
import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

export type TArtistFormPersonalProps = {
  isChecked: boolean;
  isOnChange: boolean;
  control?: Control<FieldValues>;
  values?: Partial<FieldValues>;
  errors?: Partial<FieldErrors<FieldValues>>;
  onSubmit: SubmitHandler<TArtistLegalDataForApi>;
  onError?: SubmitErrorHandler<FieldValues>;
  onEdit: () => void;
};

export type FieldValues = TArtistLegalData;

type LegalProfileKeys = `legal_profile.${keyof TLegalProfile}`;
type IdentityDataKeys = `identity_data.${keyof TIdentityData}`;
type BankDataKeys = `bank_data.${keyof TBankData}`;
type CompanyDataKeys = `company_data.${keyof TCompanyData}`;

export type FieldName =
  | LegalProfileKeys
  | IdentityDataKeys
  | BankDataKeys
  | CompanyDataKeys;

export type TArtistFormPersonalField = {
  title: string;
  name: FieldName; 
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  disabled: boolean;
  row: number;
  column: number;
  maxLength?: number;
  minLength?: number;
  options?: { label: string; value: string }[];
};
