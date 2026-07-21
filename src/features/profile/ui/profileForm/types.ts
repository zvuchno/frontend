import { type HTMLInputTypeAttribute } from "react";
import {
  type Control,
  type FieldErrors,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";

export interface FieldValues {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  city?: string;
  url?: string;
  userName?: string;
  oldPassword?: string;
}

export interface TProfileFormUIProps {
  children: React.ReactNode;
  className?: string;
  role?: "artist" | "listener";
  title: string;
  isChecked: boolean;
  isOnChange: boolean;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  control?: Control<FieldValues>;
  values?: Partial<FieldValues>;
  errors?: Partial<FieldErrors<FieldValues>>;
  onSubmit: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
  onEdit: () => void;
}

export type TProfileFormField<T extends FieldValues = FieldValues> = {
  title: string;
  name: keyof T;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  row: number;
  column: number;
};

export type TProfileFormFieldsProps = {
  fieldsDisabled: boolean;
  has_usable_password: boolean;
  disabledFields?: ReadonlyArray<keyof FieldValues>;
  showPublishHint?: boolean;
  personalDataHref?: string;
};
