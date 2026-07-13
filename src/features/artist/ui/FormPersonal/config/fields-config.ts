import type { Validate } from "react-hook-form";

import { validatePhone } from "@/shared/utils/validatePhone";

import type { FieldName, FieldValues } from "../utils/types";

export const fieldsConfig: Record<
  FieldName,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: Validate<string | undefined, FieldValues>;
  }
> = {
  "company_data.company_name": {
    required: true,
    minLength: 2,
    maxLength: 250,
  },
  "company_data.company_address": {
    required: true,
    minLength: 2,
    maxLength: 250,
  },
  "identity_data.first_name": {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  "identity_data.last_name": {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  "identity_data.middle_name": {
    required: false,
    minLength: 2,
    maxLength: 100,
  },
  "identity_data.birth_date": {
    required: true,
    validate: (value: any) => value instanceof Date && !isNaN(value.getTime()),
  },
  "identity_data.registration_address": {
    required: true,
    minLength: 2,
    maxLength: 250,
  },
  "legal_profile.email": {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  "legal_profile.phone": {
    required: true,
    validate: (value, fields) => validatePhone(value, fields),
  },
  "identity_data.passport_series": {
    required: true,
    pattern: /^(\d{4})$/,
  },
  "identity_data.passport_number": {
    required: true,
    pattern: /^(\d{6})$/,
  },
  "identity_data.passport_issued_by": {
    required: true,
    pattern: /^\d{3}-\d{3}$/,
  },
  "identity_data.passport_issue_date": {
    required: true,
    validate: (value: any) => value instanceof Date && !isNaN(value.getTime()),
  },
  "identity_data.inn": {
    required: true,
    minLength: 12,
    maxLength: 12,
    pattern: /^(\d{12})$/,
  },
  "bank_data.bank_name": {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  "bank_data.bik": {
    required: true,
    pattern: /^(\d{9})$/,
  },
  "bank_data.correspondent_account": {
    required: true,
    pattern: /^(\d{20})$/,
  },
  "bank_data.checking_account": {
    required: true,
    pattern: /^(\d{20})$/,
  },
  "company_data.ogrn": {
    required: true,
    pattern: /^(\d{13})$/,
  },
  "legal_profile.recipient_type": {
    required: true,
  },
  "company_data.inn": {
    required: true,
    minLength: 10,
    maxLength: 10,
    pattern: /^(\d{10})$/,
  },
};
