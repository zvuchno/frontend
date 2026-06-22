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
    href: "/catalog/all",
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
        href: "/catalog/album",
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

export const fansProfileRoutes = [
  {
    id: "Профиль",
    href: "/fans/profile",
    label: "Профиль",
  },
  {
    id: "Избранное",
    href: "/fans/favorites",
    label: "Избранное",
  },
  {
    id: "Заказы",
    href: "/fans/orders",
    label: "Заказы",
  },
  {
    id: "Релизы",
    href: "/fans/releases",
    label: "Релизы",
  },
] satisfies readonly MainNavRouteItem[];

export const artistsProfileRoutes = [
  {
    id: "profile",
    href: "/artist/profile",
    label: "Профиль",
  },
  {
    id: "data",
    href: "/artist/data",
    label: "Данные",
  },
  {
    id: "showcase",
    href: "/artist/showcase",
    label: "Витрина",
  },
  {
    id: "orders",
    href: "/artist/orders",
    label: "Заказы",
  },
  {
    id: "finance",
    href: "/artist/finance",
    label: "Финансы",
  },
  {
    id: "settings",
    href: "/artist/settings",
    label: "Настройки",
  },
] satisfies readonly MainNavRouteItem[];
