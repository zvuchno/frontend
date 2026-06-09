import { SearchIcon } from "../../../../shared/ui/Icons/searchIcon";
import { CartIcon } from "../../../../shared/ui/Icons/cartIcon";
import { ProfileIcon } from "../../../../shared/ui/Icons/profileIcon";
import { Url } from "next/dist/shared/lib/router/router";

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
    children: <CartIcon />,
  },
  {
    title: "Профиль",
    type: "link",
    href: "/role",
    children: <ProfileIcon />,
  },
];
