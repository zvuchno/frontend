import { type THeaderAction } from "../config/headerActions";

export interface THeaderUIProps {
  actions: THeaderAction[];
  className?: string;
  style?: React.CSSProperties;
}
