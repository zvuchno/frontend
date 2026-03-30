import type { ReactNode } from 'react';

export interface AccordionProps {
  artistCardInfo?: {
    image?: string;
    description?: string;
    hasButton?: boolean;
  };
  trigger?: ReactNode;
  content: string[];
  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}