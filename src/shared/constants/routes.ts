export type FooterLink = {
  label: string;
  href: string;
};
export const defaultLinks: FooterLink[] = [
  { label: 'Контакты', href: '/contacts' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Для артистов', href: '/artists' },
  { label: 'Для фанатов', href: '/fans' },
  { label: 'Условия использования', href: '/terms' },
];
import type { ComponentPropsWithoutRef } from "react";

type NextLinkProps = ComponentPropsWithoutRef<
  typeof import("next/link").default
>;

export type MainNavRouteItem = {
  id: string;
  href: NextLinkProps["href"];
  label: string;
};

export type MainNavRoute = MainNavRouteItem & {
  items?: readonly MainNavRouteItem[];
};

export const mainNavRoutes = [
  {
    id: "home",
    href: "/",
    label: "главная",
  },
  {
    id: "catalog",
    href: "/catalog",
    label: "каталог",
    items: [
      {
        id: "artists",
        href: "/catalog/artists",
        label: "артисты",
      },
      {
        id: "merch",
        href: "/catalog/merch",
        label: "мерч",
      },
      {
        id: "music",
        href: "/catalog/music",
        label: "музыка",
      },
    ],
  },
  {
    id: "artists-hub",
    href: "/for-artists",
    label: "артистам",
  },
] satisfies readonly MainNavRoute[];
