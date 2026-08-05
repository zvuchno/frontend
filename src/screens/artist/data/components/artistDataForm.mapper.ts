/*import type {
  TArtistLegalData,
  TArtistLegalDataForApi,
  TLegalProfile,
} from "@/entities/Artist/store/types";

import { defaultArtistData } from "./artistDataForm.config";
import type { ArtistDataFormValues } from "./artistDataForm.types";

type RecipientType = TLegalProfile["recipient_type"];

const recipientTypeLabels: Record<Exclude<RecipientType, "individual_temporary">, string> = {
  individual_entrepreneur: "ИП",
  self_employed: "СМЗ",
  legal_entity: "Юридическое лицо",
};

const recipientTypeValues: Record<string, RecipientType> = {
  individual_entrepreneur: "individual_entrepreneur",
  self_employed: "self_employed",
  legal_entity: "legal_entity",
  ип: "individual_entrepreneur",
  "индивидуальный предприниматель": "individual_entrepreneur",
  смз: "self_employed",
  самозанятый: "self_employed",
  "юридическое лицо": "legal_entity",
  юрлицо: "legal_entity",
  юл: "legal_entity",
};

const formatDateForForm = (value?: Date | string | null) => {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return "";
    }

    const day = String(value.getDate()).padStart(2, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const year = value.getFullYear();

    return `${day}.${month}.${year}`;
  }

  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    return value;
  }

  const apiDateMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!apiDateMatch) {
    return "";
  }

  return `${apiDateMatch[3]}.${apiDateMatch[2]}.${apiDateMatch[1]}`;
};

const formatDateForApi = (value: string) => {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (!match) {
    return null;
  }

  return `${match[3]}-${match[2]}-${match[1]}`;
};

const toRecipientType = (value: string) => recipientTypeValues[value.trim().toLowerCase()];

const toRecipientTypeLabel = (value?: string) => {
  if (!value) {
    return defaultArtistData.taxSystem;
  }

  return recipientTypeLabels[value as RecipientType] ?? value;
};

export const toArtistDataFormValues = (
  data?: Partial<TArtistLegalData> | null
): ArtistDataFormValues => {
  if (!data) {
    return defaultArtistData;
  }

  const identity = data.identity_data;
  const bank = data.bank_data;
  const legal = data.legal_profile;

  return {
    lastName: identity?.last_name ?? defaultArtistData.lastName,
    firstName: identity?.first_name ?? defaultArtistData.firstName,
    middleName: identity?.middle_name ?? defaultArtistData.middleName,
    birthDate: formatDateForForm(identity?.birth_date),
    registrationAddress: identity?.registration_address ?? defaultArtistData.registrationAddress,
    passportSeries: identity?.passport_series ?? defaultArtistData.passportSeries,
    passportNumber: identity?.passport_number ?? defaultArtistData.passportNumber,
    departmentCode: identity?.passport_issued_by ?? defaultArtistData.departmentCode,
    passportIssueDate: formatDateForForm(identity?.passport_issue_date),
    inn: identity?.inn ?? defaultArtistData.inn,
    bankName: bank?.bank_name ?? defaultArtistData.bankName,
    bik: bank?.bik ?? defaultArtistData.bik,
    correspondentAccount: bank?.correspondent_account ?? defaultArtistData.correspondentAccount,
    checkingAccount: bank?.checking_account ?? defaultArtistData.checkingAccount,
    taxSystem: toRecipientTypeLabel(legal?.recipient_type),
  };
};

export const toArtistLegalDataPayload = (values: ArtistDataFormValues): TArtistLegalDataForApi => {
  const recipientType = toRecipientType(values.taxSystem);

  return {
    ...(recipientType
      ? {
          legal_profile: {
            recipient_type: recipientType,
          },
        }
      : {}),
    identity_data: {
      last_name: values.lastName.trim(),
      first_name: values.firstName.trim(),
      middle_name: values.middleName.trim(),
      birth_date: formatDateForApi(values.birthDate),
      registration_address: values.registrationAddress.trim(),
      passport_series: values.passportSeries.trim(),
      passport_number: values.passportNumber.trim(),
      passport_issued_by: values.departmentCode.trim(),
      passport_issue_date: formatDateForApi(values.passportIssueDate),
      inn: values.inn.trim(),
    },
    bank_data: {
      bank_name: values.bankName.trim(),
      bik: values.bik.trim(),
      correspondent_account: values.correspondentAccount.trim(),
      checking_account: values.checkingAccount.trim(),
    },
  };
};
*/