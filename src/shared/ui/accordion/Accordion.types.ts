import type { ReactNode } from 'react';

export interface AccordionProps {
  mainBlock?: React.ReactNode;
  trigger?: ReactNode;
  content: string[];
  containerClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}