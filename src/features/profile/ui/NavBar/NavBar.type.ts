import type { LinkItem } from "@/shared/ui";

export interface NavBarProps {
  links: readonly LinkItem[];
  title?: string;
}
