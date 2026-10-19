import { SVGProps } from "react";

export type TChoiseItem = {
  label: string;
  value: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  count?: string;
};

export type ChoiceItemProps = {
  items: TChoiseItem[];
  value: string;
  onChange: (value: string) => void;
}