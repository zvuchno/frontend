export type TLegalProfile = {
  email: string;
  phone: string;
  recipient_type: "individual_entrepreneur" | "legal_entity" | "self_employed";
};

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
};

export type TIdentityDataForApi = Partial<Omit<TIdentityData, "birth_date" | "passport_issue_date">> & {
  birth_date?: string | null;
  passport_issue_date?: string | null;
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
  legal_profile: Partial<TLegalProfile>;
  identity_data: Partial<TIdentityData>;
  bank_data?: Partial<TBankData>;
  company_data?: Partial<TCompanyData>;
}

export type TArtistLegalDataForApi = Partial<Omit<TArtistLegalData, "identity_data">> & {
  identity_data?: TIdentityDataForApi;
};
