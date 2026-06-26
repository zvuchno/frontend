import { type MainNavRouteItem } from "@/shared/constants";

export type FooterLink = MainNavRouteItem;

export interface FooterProps {
  links?: FooterLink[];
  telegramUrl?: string;
  copyright?: string;
  className?: string;
}
