import type { ReactNode } from 'react';

export interface AccordeonCardUIProps {
  label: ReactNode;
  trigger: ReactNode;
  children: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  isOpen?: boolean;
  onClick: () => void;
}