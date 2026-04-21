import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

export interface FieldValues {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  city?: string;
  url?: string;
}

export interface TProfileFormUIProps {
  children: React.ReactNode;
  role?: "artist" | "listener";
  title: string;
  isChecked: boolean;
  isOnChange: boolean;
  control?: Control<FieldValues>;
  values?: Partial<FieldValues>;
  errors?: Partial<FieldErrors<FieldValues>>;
  onSubmit: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
  onEdit: () => void;
}

export type TProfileFormField = {
  title: string;
  name: keyof FieldValues;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  row: number;
  column: number;
};

export type TProfileFormFieldsProps = {
  fieldsDisabled: boolean;
  disabledFields?: ReadonlyArray<keyof FieldValues>;
} & (
  | {
      showPublishHint?: true;
      personalDataHref: string;
    }
  | {
      showPublishHint: false;
      personalDataHref?: never;
    }
);
