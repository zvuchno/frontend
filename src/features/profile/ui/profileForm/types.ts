import { HTMLInputTypeAttribute } from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";

export interface TProfileFormUIProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  role: 'artist' | 'listener',
  isChecked: boolean,
  isProfileNew: boolean,
  isOnChange: boolean,
  control?: Control<any>,
  errors?: FieldErrors,
  values?: FieldValues,
  onEdit: () => void
}

export type TProfileFormField = {
  title: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  row: number;
  column: number;
}

export type TProfileFormFieldsProps = {
  fields: TProfileFormField[],
  errors?: FieldErrors,
  fieldsDisabled: boolean
}