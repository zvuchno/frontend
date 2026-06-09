import { ReactNode } from "react";

type TItem = {
  label: ReactNode;
  children: ReactNode;
};

export interface SectionFAQProps {
  title: string;
  items: TItem[];
};