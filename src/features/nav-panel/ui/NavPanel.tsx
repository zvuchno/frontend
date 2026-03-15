import clsx from "clsx";

import { Link } from "@/shared/ui/Link/Link";

import styles from "./NavPanel.module.scss";
import type { NavPanelProps } from "./types";

const items = [
  {
    id: "home",
    href: "/",
    label: "главная",
  },
  {
    id: "catalog",
    href: "/catalog",
    label: "каталог",
  },
  {
    id: "artists-hub",
    href: "/for-artists",
    label: "артистам",
  },
] as const;

export function NavPanel({ className }: NavPanelProps) {
  return (
    <nav
      className={clsx(styles.navPanel, className)}
      aria-label="Основная навигация"
    >
      {items.map((item) => (
        <Link key={item.id} href={item.href} variant="outlined">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
