import clsx from "clsx";

import { Link } from "@/shared/ui/Link/Link";

import { NavPanelDropdown } from "./dropdown/NavPanelDropdown";
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

const catalogItems = [
  {
    id: "artists",
    href: "/catalog/artists",
    label: "артисты",
  },
  {
    id: "merch",
    href: "/catalog/merch",
    label: "мерч",
  },
  {
    id: "music",
    href: "/catalog/music",
    label: "музыка",
  },
] as const;

export function NavPanel({ className, isCatalogOpen = false }: NavPanelProps) {
  return (
    <nav
      className={clsx(styles.navPanel, className)}
      aria-label="Основная навигация"
    >
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <Link
            href={item.href}
            variant="outlined"
            className={clsx(
              item.id === "catalog" && isCatalogOpen && styles.catalogLinkOpen,
            )}
          >
            {item.label}
          </Link>

          {item.id === "catalog" && isCatalogOpen ? (
            <NavPanelDropdown
              className={styles.dropdown}
              items={catalogItems}
            />
          ) : null}
        </div>
      ))}
    </nav>
  );
}
