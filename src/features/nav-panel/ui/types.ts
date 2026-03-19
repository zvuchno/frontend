import type { MainNavRoute } from "@/shared/constants/routes";

export type NavPanelProps = {
  className?: string;
  items?: readonly MainNavRoute[];
};
