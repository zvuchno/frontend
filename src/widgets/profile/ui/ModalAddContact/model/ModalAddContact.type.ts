import { type HTMLInputTypeAttribute } from "react";
import { type RegisterOptions, type SubmitHandler } from "react-hook-form";

export type TFieldValues = {
  name?: string;
  email?: string;
  url?: string;
};

export type TAddContactFormField = {
  title: string;
  name: keyof TFieldValues;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required: boolean;
  validation?: Partial<RegisterOptions>;
};

type TFormVariant = "contact" | "link";

export interface ModalAddContactProps {
  variant: TFormVariant;
  isOpen: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<TFieldValues>;
}
