import type { MainNavRoute } from "@/shared/constants";

export type NavPanelProps = {
  className?: string;
  items?: readonly MainNavRoute[];
};
