import type { ReactNode } from "react";

export type DefinitionProps = {
  term: ReactNode;
  description: ReactNode;
  termClassName?: string;
  descriptionClassName?: string;
};
