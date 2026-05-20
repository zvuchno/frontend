"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Link } from "@/shared/ui/Link/Link";
import { NavBarProps } from "./NavBar.type";
import s from "./NavBar.module.scss";

const NavBar = ({ links }: NavBarProps) => {
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

    if (linkHash) {
      return pathname === linkPathname && hash === `#${linkHash}`;
    }

    return pathname === href && hash === "";
  };

  return (
    <nav className={s.container} aria-label="Навигация профиля">
      {links.map((link) => {
        const href =
          typeof link.href === "string" ? link.href : link.href.pathname;

        return (
          <Link
            key={link.id}
            href={link.href}
            variant="outlined"
            className={clsx(s.link, {
              [s.link_active]: typeof href === "string" && isLinkActive(href),
            })}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
