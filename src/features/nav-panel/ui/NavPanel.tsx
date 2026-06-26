"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import { mainNavRoutes } from "@/shared/constants";
import { Link } from "@/shared/ui";

import styles from "./NavPanel.module.scss";
import type { NavPanelProps } from "./types";

export function NavPanel({ className, items = mainNavRoutes }: NavPanelProps) {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";

    const segments = href.split("/").filter(Boolean);

    return pathname === `/${segments[0] || ""}` || pathname.startsWith(`/${segments[0] || ""}`);
  };

  return (
    <nav className={clsx(styles.navPanel, className)} aria-label='Основная навигация'>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          variant='outlined'
          items={item.items}
          className={isActive(item.href.toString()) ? `${styles.linkActive}` : ""}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
