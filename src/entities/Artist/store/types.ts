export type TLegalProfile = {
  recipient_type: 'individual_entrepreneur' | 'legal_entity' | 'self_employed';
}

export type TIdentityData = {
  first_name: string;
  last_name: string;
  middle_name: string;
  birth_date: Date;
  registration_address: string;
  passport_series: string;
  passport_number: string;
  passport_issued_by: string;
  passport_issue_date: Date;
  inn: string;
  email?: string; //  свериться с бэком
  phone?: string; //  свериться с бэком
};

export type TBankData = {
  bank_name: string;
  bik: string;
  correspondent_account: string;
  checking_account: string;
}

export type TCompanyData = {
  company_name: string;
  company_address: string;
  inn: string;
  ogrn: string;
}

export type TArtistLegalData = {
  legal_profile: TLegalProfile;
  identity_data: TIdentityData;
  bank_data?: TBankData;
  company_data?: TCompanyData;
}