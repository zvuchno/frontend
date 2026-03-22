import clsx from "clsx";

import { mainNavRoutes } from "@/shared/constants/routes";
import { Link } from "@/shared/ui/Link/Link";

import styles from "./NavPanel.module.scss";
import type { NavPanelProps } from "./types";

export function NavPanel({ className, items = mainNavRoutes }: NavPanelProps) {
  return (
    <nav
      className={clsx(styles.navPanel, className)}
      aria-label="Основная навигация"
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          variant="outlined"
          items={item.items}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
