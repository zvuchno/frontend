import type { ComponentPropsWithoutRef } from "react";

import type Link from "next/link";

type NextLinkProps = ComponentPropsWithoutRef<typeof Link>;

export type MainNavRouteItem = {
  id: string;
  href: NextLinkProps["href"];
  label: string;
};

export type MainNavRoute = MainNavRouteItem & {
  items?: readonly MainNavRouteItem[];
};

// ссылки в header
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

// ссылки в footer
export const footerNavRoutes = [
  {
    id: "contacts",
    href: "/contacts",
    label: "Контакты",
  },
  {
    id: "catalog",
    href: "/catalog/all",
    label: "Каталог",
  },
  {
    id: "artists-hub",
    href: "/for-artists",
    label: "Для артистов",
  },
  {
    id: "fans-hub",
    href: "/",
    label: "Для фанатов",
  },
  {
    id: "legal",
    href: "/legal",
    label: "Условия использования",
  },
] satisfies readonly MainNavRoute[];

//основные разделы кабинета фаната
export const fansProfileRoutes = [
  {
    id: "fans-profile",
    href: "/fans/profile",
    label: "Профиль",
  },
  {
    id: "fans-library",
    href: "/fans/releases",
    label: "Библиотека",
  },
  {
    id: "fans-favorites",
    href: "/fans/favorites",
    label: "Избранное",
  },
  {
    id: "fans-orders",
    href: "/fans/orders",
    label: "Заказы",
  },
] satisfies readonly MainNavRouteItem[];

//раздел кабинета фаната "стать артистом" (если еще не артист)
export const fansProfileArtistRoute = [
  {
    id: "become-artist",
    href: "/fans/change-account-type",
    label: "Стать артистом",
  },
] satisfies readonly MainNavRouteItem[];

//разделы кабинета артиста / лейбла
export const artistsProfileRoutes = (role: "artist" | "label") => {
  const mainLinks = [
    {
      id: "artist-data",
      href: "/artist/data",
      label: "Данные",
    },
    {
      id: "artist-showcase",
      href: "/artist/showcase",
      label: "Витрина",
    },
    {
      id: "artist-orders",
      href: "/artist/orders",
      label: "Продажи",
    },
    {
      id: "artist-finance",
      href: "/artist/finance",
      label: "Финансы",
    },
    {
      id: "artist-settings",
      href: "/artist/settings",
      label: "Настройки",
    },
  ];

  const profileLink = [
    {
      id: "artist-profile",
      href: "/artist/profile",
      label: role === "artist" ? "Кабинет артиста" : "Кабинет лейбла",
    },
  ];

  const extraLink =
    role === "label"
      ? [
          {
            id: "artist-label",
            href: "/artist/label",
            label: "Артисты",
          },
        ]
      : [
          {
            id: "become-artist",
            href: "/artist/change-account-type",
            label: "Стать лейблом",
          },
        ];

  const artistLinks = profileLink.concat(mainLinks).concat(extraLink);

  return artistLinks satisfies readonly MainNavRouteItem[];
};
