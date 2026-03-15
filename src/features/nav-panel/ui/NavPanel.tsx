"use client";

import type { MouseEvent } from "react";
import clsx from "clsx";
import { useState } from "react";

import { Link } from "@/shared/ui/Link/Link";

import { NavPanelDropdown } from "./dropdown/NavPanelDropdown";
import styles from "./NavPanel.module.scss";
import type { NavPanelItem, NavPanelProps } from "./types";

const defaultItems: readonly NavPanelItem[] = [
  {
    id: "home",
    href: "/",
    label: "главная",
  },
  {
    id: "catalog",
    href: "/catalog",
    label: "каталог",
    dropdownItems: [
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
    ],
  },
  {
    id: "artists-hub",
    href: "/for-artists",
    label: "артистам",
  },
];

export function NavPanel({
  className,
  items = defaultItems,
  defaultOpenItemId,
}: NavPanelProps) {
  const [openItemId, setOpenItemId] = useState(defaultOpenItemId);

  const openItem = items.find(
    (item) => item.id === openItemId && item.dropdownItems?.length,
  );

  const handleItemToggle = (
    event: MouseEvent<HTMLAnchorElement>,
    itemId: string,
    hasDropdown: boolean,
  ) => {
    if (!hasDropdown) {
      return;
    }

    event.preventDefault();
    setOpenItemId((currentItemId) =>
      currentItemId === itemId ? undefined : itemId,
    );
  };

  const handleMenuClose = () => {
    setOpenItemId(undefined);
  };

  return (
    <nav
      className={clsx(styles.navPanel, className)}
      aria-label="Основная навигация"
    >
      {openItem ? (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Закрыть выпадающее меню"
          onClick={handleMenuClose}
        />
      ) : null}

      {items.map((item) => {
        const hasDropdown = Boolean(item.dropdownItems?.length);
        const isOpen = openItem?.id === item.id;

        return (
          <div key={item.id} className={styles.item}>
            <Link
              href={item.href}
              variant="outlined"
              className={clsx(isOpen && styles.triggerOpen)}
              aria-expanded={hasDropdown ? isOpen : undefined}
              aria-haspopup={hasDropdown ? "menu" : undefined}
              onClick={(event) => handleItemToggle(event, item.id, hasDropdown)}
            >
              {item.label}
            </Link>

            {isOpen && item.dropdownItems ? (
              <NavPanelDropdown
                className={styles.dropdown}
                items={item.dropdownItems}
                onItemClick={handleMenuClose}
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
