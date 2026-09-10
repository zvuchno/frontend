import type { Validate } from "react-hook-form";

import { comparePassportDate } from "@/shared/utils/comparePassportDate";
import { validateDateInPast } from "@/shared/utils/validateDateInPast";
import { validatePhone } from "@/shared/utils/validatePhone";

import type { FieldName, FieldValues } from "../utils/types";

export const fieldsConfig: Record<
  FieldName,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: Validate<unknown, FieldValues>;
  }
> = {
  "company_data.company_name": {
    required: false,
    minLength: 2,
    maxLength: 250,
  },
  "company_data.company_address": {
    required: false,
    minLength: 2,
    maxLength: 250,
  },
  "identity_data.first_name": {
    required: false,
    minLength: 2,
    maxLength: 100,
  },
  "identity_data.last_name": {
    required: false,
    minLength: 2,
    maxLength: 100,
  },
  "identity_data.middle_name": {
    required: false,
    minLength: 2,
    maxLength: 100,
  },
  "identity_data.birth_date": {
    required: false,
    validate: (value, fields) => validateDateInPast(value, fields),
  },
  "identity_data.registration_address": {
    required: false,
    minLength: 2,
    maxLength: 250,
  },
  "legal_profile.email": {
    required: false,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  "legal_profile.phone": {
    required: false,
    validate: (value, fields) => validatePhone(value, fields),
  },
  "identity_data.passport_series": {
    required: false,
    pattern: /^(\d{4})$/,
  },
  "identity_data.passport_number": {
    required: false,
    pattern: /^(\d{6})$/,
  },
  "identity_data.passport_issued_by": {
    required: false,
    pattern: /^\d{3}-\d{3}$/,
  },
  "identity_data.passport_issue_date": {
    required: false,
    validate: (value, fields) => comparePassportDate(value, fields),
  },
  "identity_data.inn": {
    required: false,
    minLength: 12,
    maxLength: 12,
    pattern: /^(\d{12})$/,
  },
  "bank_data.bank_name": {
    required: false,
    minLength: 2,
    maxLength: 100,
  },
  "bank_data.bik": {
    required: false,
    pattern: /^(\d{9})$/,
  },
  "bank_data.correspondent_account": {
    required: false,
    pattern: /^(\d{20})$/,
  },
  "bank_data.checking_account": {
    required: false,
    pattern: /^(\d{20})$/,
  },
  "company_data.ogrn": {
    required: false,
    pattern: /^(\d{13})$/,
  },
  "legal_profile.recipient_type": {
    required: false,
  },
  "company_data.inn": {
    required: false,
    minLength: 10,
    maxLength: 10,
    pattern: /^(\d{10})$/,
  },
  "legal_profile.is_veryfied": {
    required: false,
  },
  "legal_profile.comment": {
    required: false,
  },
};
