"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowIcon } from "@/shared/ui";
import { MenuIcon } from "@/shared/ui/MenuIcon/MenuIcon";

import s from "./NavBar.module.scss";
import { type NavBarProps } from "./NavBar.type";

export const NavBar = ({ links, title }: NavBarProps) => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    const [linkPathname, linkHash] = href.split("#");
    const normalizedLinkPathname = linkPathname.replace(/\/$/, "");
    const isCurrentPath =
      pathname === normalizedLinkPathname || pathname.startsWith(`${normalizedLinkPathname}/`);

    if (linkHash) {
      return isCurrentPath && hash === `#${linkHash}`;
    }

    return isCurrentPath && hash === "";
  };

  return (
    <div className={s.wrapper}>
      <div className={s.titleWrapper}>
        <h4 className={s.title}>{title}</h4>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={clsx(s.titleButton, { [s.open]: isMenuOpen })}
        >
          <ArrowIcon />
        </button>
      </div>

      <nav
        className={clsx(s.container, { [s.isShown]: isMenuOpen })}
        aria-label='Навигация профиля'
      >
        {links.map((link) => {
          const href = typeof link.href === "string" ? link.href : link.href.pathname;
          const Icon = link.icon;

          return (
            <Link
              key={link.id}
              href={link.href}
              className={clsx(s.link, {
                [s.link_active]: typeof href === "string" && isLinkActive(href),
              })}
            >
              <div className={s.menuTag}>
                <MenuIcon className={s.menuTagIconContainer}>
                  {Icon && <Icon className={s.menuTagIcon} aria-hidden='true' />}
                </MenuIcon>
                <span className={s.menuTagName}>{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
