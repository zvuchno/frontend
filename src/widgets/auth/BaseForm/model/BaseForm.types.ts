import { type ReactNode } from "react";

export interface BaseFormProps {
  title: string;
  onSubmit?: (data: { email?: string; password?: string }) => void;
  renderFields?: () => ReactNode;
  renderPrimaryButton?: (isLoading: boolean) => ReactNode;
  renderSecondaryButton?: (isLoading?: boolean) => ReactNode;
  renderSocialLogin?: () => ReactNode;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
}
