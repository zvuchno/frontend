import { HTMLInputTypeAttribute } from "react"
import { Control, FieldErrors, SubmitErrorHandler, SubmitHandler } from "react-hook-form"

export type TArtistFormPersonalProps = {
  title: string,
  isChecked: boolean,
  isOnChange: boolean,
  control?: Control<FieldValues>,
  values?: Partial<FieldValues>,
  errors?: Partial<FieldErrors<FieldValues>>,
  onSubmit: SubmitHandler<FieldValues>,
  onError?: SubmitErrorHandler<FieldValues>
  onEdit: () => void
}

export type TPassportData = {
  series?: string,
  number?: string,
  issuerCode?: string,
  issueDate?: Date | null,
}

export type TPaymentData = {
  taxId?: string,
  bankName?: string,
  bic?: string,
  correspondentAccount?: string,
  account?: string,
  taxSystem?: string
}

export interface FieldValues {
  firstName?: string,
  lastName?: string,
  middleName?: string,
  birthDate?: Date | null,
  adress?: string,
  passport?: TPassportData,
  paymentDetails?: TPaymentData
}

type PassportKeys = `passport.${keyof TPassportData}`;
type PaymentKeys = `paymentDetails.${keyof TPaymentData}`;
export type FieldName = keyof Omit<FieldValues, 'passport' | 'paymentDetails'> | PassportKeys | PaymentKeys

export type TArtistFormPersonalField = {
  title: string;
  name: FieldName
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  disabled: boolean;
  row: number;
  column: number;
  maxLength?: number;
  minLength?: number
}
