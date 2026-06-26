import { type HTMLInputTypeAttribute } from "react";
import {
  type Control,
  type FieldErrors,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";

import {
  type TArtistLegalData,
  type TArtistLegalDataForApi,
  type TBankData,
  type TCompanyData,
  type TIdentityData,
  type TLegalProfile,
} from "@/entities/Artist/store/types";

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

export type FieldName = LegalProfileKeys | IdentityDataKeys | BankDataKeys | CompanyDataKeys;

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
