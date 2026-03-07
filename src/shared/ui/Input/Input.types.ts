import { InputHTMLAttributes, Ref } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  value?: string;
  isRequired: boolean;
  className?: string;
  label?: string;
  error?: string;
  innerRef?: Ref<HTMLInputElement>;
  isHighlighted: boolean;
  hintText?: string;
  inputSize?: 'small' | 'large';
};