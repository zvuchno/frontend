"use client";

import { Link } from "@/shared/ui/Link/Link";
import { NavBarProps } from "./NavBar.type";
import s from './NavBar.module.scss';
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavBar = ({ links }: NavBarProps) => {

  const pathname = usePathname();

  return (
    <nav
      className={s.container}
      aria-label="Навигация профиля"
    >
      {links.map((link) => (
        <Link key={link.id} href={link.href} variant="outlined" className={clsx(s.link, {[s.link_active]: pathname === link.href})}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
};

export default NavBar;