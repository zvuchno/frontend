import { ReactNode } from "react";

export interface BaseFormProps {
  title: string;
  onSubmit?: (data: { email?: string; password?: string }) => void;
  onClose?: () => void;
  renderFields?: () => ReactNode;
  renderPrimaryButton?: (isLoading: boolean) => ReactNode;
  renderSecondaryButton?: () => ReactNode;
  renderSocialLogin?: () => ReactNode;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

