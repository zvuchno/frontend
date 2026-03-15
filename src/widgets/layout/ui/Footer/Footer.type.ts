export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  links?: FooterLink[];
  telegramUrl?: string;
  copyright?: string;
  className?: string;
}