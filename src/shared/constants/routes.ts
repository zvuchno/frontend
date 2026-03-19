export type FooterLink = {
  label: string;
  href: string;
};
export const defaultLinks: FooterLink[] = [
  { label: 'Контакты', href: '/contacts' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Для артистов', href: '/for-artists' },
  { label: 'Для фанатов', href: '/for-fans' },
  { label: 'Условия использования', href: '/terms' },
];