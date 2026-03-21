import type { ReactNode } from "react";

export type DefinitionProps = {
  term: ReactNode;
  description: ReactNode;
  className?: string;
  termClassName?: string;
  descriptionClassName?: string;
};
