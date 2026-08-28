"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import { Link } from "@/shared/ui";

import s from "./NavBar.module.scss";
import { type NavBarProps } from "./NavBar.type";

export const NavBar = ({ links, title }: NavBarProps) => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

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
      <h4 className={s.title}>{title}</h4>

      <nav className={s.container} aria-label='Навигация профиля'>
        {links.map((link) => {
          const href = typeof link.href === "string" ? link.href : link.href.pathname;

          return (
            <Link
              key={link.id}
              href={link.href}
              variant='outlined'
              className={clsx(s.link, {
                [s.link_active]: typeof href === "string" && isLinkActive(href),
              })}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
