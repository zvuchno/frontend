import { THeaderAction } from "@/widgets/layout/ui/header/types";
import { SearchIcon } from "../ui/icons/searchIcon";
import { CartIcon } from "../ui/icons/cartIcon";
import { ProfileIcon } from "../ui/icons/profileIcon";


export const DefaultHeaderActions: THeaderAction[] = [
  {
    title: 'Поиск',
    type: 'button',
    children: <SearchIcon />
  },
  {
    title: 'Корзина',
    type: 'link',
    href: '/cart',
    children: <CartIcon />
  },
  {
    title: 'Профиль',
    type: 'link',
    href: '/profile',
    children: <ProfileIcon />
  },
]