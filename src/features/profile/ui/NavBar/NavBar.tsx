"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menutag } from "@/shared/ui/MenuTag/MenuTag";

import s from "./NavBar.module.scss";
import { type NavBarProps } from "./NavBar.type";

export const NavBar = ({ links, title }: NavBarProps) => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  const initMenuState =
    (pathname.includes("fans") && title === "Аккаунт") ||
    (pathname.includes("artist") && title === "Кабинет артиста");
  const [isMenuOpen, setIsMenuOpen] = useState(initMenuState);

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
          title={isMenuOpen ? "Свернуть" : "Развернуть"}
          className={clsx(s.titleButton, { [s.open]: isMenuOpen })}
        >
          <Image
            src='/icons/arrow-right.svg'
            alt={isMenuOpen ? "Свернуть" : "Развернуть"}
            width={24}
            height={24}
          />
        </button>
      </div>

      <nav
        className={clsx(s.container, { [s.isShown]: isMenuOpen })}
        aria-label='Навигация профиля'
      >
        {links.map((link) => {
          const href = typeof link.href === "string" ? link.href : link.href.pathname;

          return (
            <Link
              key={link.id}
              href={link.href}
              className={clsx(s.link, {
                [s.link_active]: typeof href === "string" && isLinkActive(href),
              })}
            >
              <Menutag
                title={link.label}
                icon={link.icon}
                isActive={typeof href === "string" && isLinkActive(href)}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
