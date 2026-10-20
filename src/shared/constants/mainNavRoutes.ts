import type { ComponentPropsWithoutRef, ComponentType, SVGProps } from "react";

import type Link from "next/link";

import IconArtists from "../../../public/icons/Artists.svg";
import IconBookmark from "../../../public/icons/Bookmark.svg";
import IconCash from "../../../public/icons/Cash.svg";
import IconCoin from "../../../public/icons/Coin.svg";
import IconCube from "../../../public/icons/Cube.svg";
import IconDocument from "../../../public/icons/Document.svg";
import IconGridAdd from "../../../public/icons/GridAdd.svg";
import IconMusic from "../../../public/icons/Music.svg";
import IconPost from "../../../public/icons/Post.svg";
import IconStar from "../../../public/icons/Star.svg";
import IconUser from "../../../public/icons/User.svg";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type NextLinkProps = ComponentPropsWithoutRef<typeof Link>;

export type MainNavRouteItem = {
  id: string;
  href: NextLinkProps["href"];
  label: string;
  icon?: IconComponent;
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
    icon: IconUser as IconComponent,
  },
  {
    id: "fans-library",
    href: "/fans/releases",
    label: "Библиотека",
    icon: IconMusic as IconComponent,
  },
  {
    id: "fans-favorites",
    href: "/fans/favorites",
    label: "Избранное",
    icon: IconBookmark as IconComponent,
  },
  {
    id: "fans-orders",
    href: "/fans/orders",
    label: "Заказы",
    icon: IconPost as IconComponent,
  },
] satisfies readonly MainNavRouteItem[];

//раздел кабинета фаната "стать артистом" (если еще не артист)
export const fansProfileArtistRoute = [
  {
    id: "become-artist",
    href: "/fans/change-account-type",
    label: "Стать артистом",
    icon: IconStar as IconComponent,
  },
] satisfies readonly MainNavRouteItem[];

//разделы кабинета артиста / лейбла
export const artistsProfileRoutes = (role: "artist" | "label") => {
  const mainLinks = [
    {
      id: "artist-data",
      href: "/artist/data",
      label: "Данные",
      icon: IconDocument as IconComponent,
    },
    {
      id: "artist-showcase",
      href: "/artist/showcase",
      label: "Витрина",
      icon: IconGridAdd as IconComponent,
    },

    {
      id: "artist-finance",
      href: "/artist/finance",
      label: "Финансы",
      icon: IconCash as IconComponent,
    },
    {
      id: "artist-orders",
      href: "/artist/orders",
      label: "Продажи",
      icon: IconCoin as IconComponent,
    },
    {
      id: "artist-settings",
      href: "/artist/settings",
      label: "Доставка",
      icon: IconCube as IconComponent,
    },
  ];

  const profileLink = [
    {
      id: "artist-profile",
      href: "/artist/profile",
      label: role === "artist" ? "Кабинет артиста" : "Кабинет лейбла",
      icon: IconStar as IconComponent,
    },
  ];

  const extraLink =
    role === "label"
      ? [
          {
            id: "artist-label",
            href: "/artist/label",
            label: "Артисты",
            icon: IconArtists as IconComponent,
          },
        ]
      : [
          {
            id: "become-artist",
            href: "/artist/change-account-type",
            label: "Стать лейблом",
            icon: IconStar as IconComponent,
          },
        ];

  const artistLinks = profileLink.concat(mainLinks).concat(extraLink);

  return artistLinks satisfies readonly MainNavRouteItem[];
};
