import { type Url } from "next/dist/shared/lib/router/router";

import { ProfileIcon } from "@/shared/ui/Icons/profileIcon";
import { SearchIcon } from "@/shared/ui/Icons/searchIcon";

export type THeaderAction = {
  title: string;
  type: "link" | "button";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  href?: Url;
};

export const DefaultHeaderActions: THeaderAction[] = [
  {
    title: "Поиск",
    type: "button",
    children: <SearchIcon />,
  },
  {
    title: "Корзина",
    type: "link",
    href: "/cart",
  },
  {
    title: "Профиль",
    type: "link",
    href: "/profile",
    children: <ProfileIcon />,
  },
];
