export type ArtistDataFormValues = {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  registrationAddress: string;
  passportSeries: string;
  passportNumber: string;
  departmentCode: string;
  passportIssueDate: string;
  inn: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
  checkingAccount: string;
  taxSystem: string;
};

export type ArtistDataFieldName = keyof ArtistDataFormValues;

export type ArtistDataValidation = {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
};

export type ArtistDataField = {
  name: ArtistDataFieldName;
  label: string;
  placeholder: string;
  autoComplete?: string;
  wide?: boolean;
  validation?: ArtistDataValidation;
};

export type ArtistDataFieldGroup = {
  id: string;
  fields: ArtistDataField[];
};
