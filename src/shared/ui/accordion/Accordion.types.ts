import type { ReactNode } from 'react';

export interface AccordionProps {
  label: ReactNode;
  trigger?: ReactNode;
  children: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}