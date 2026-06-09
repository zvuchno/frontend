import { THeaderAction } from "@/widgets/layout/Header/config/headerActions";

export interface THeaderUIProps {
  actions: THeaderAction[];
  className?: string;
  style?: React.CSSProperties;
}
