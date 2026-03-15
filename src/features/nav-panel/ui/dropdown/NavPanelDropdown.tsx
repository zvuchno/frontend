import type { MouseEvent } from "react";

import clsx from "clsx";

import { Link } from "@/shared/ui/Link/Link";

import styles from "./NavPanelDropdown.module.scss";
import type { NavPanelDropdownItem } from "../types";

type NavPanelDropdownProps = {
  className?: string;
  items: readonly NavPanelDropdownItem[];
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function NavPanelDropdown({
  className,
  items,
  onItemClick,
}: NavPanelDropdownProps) {
  return (
    <div className={clsx(styles.dropdown, className)} role="menu">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={styles.link}
          role="menuitem"
          onClick={onItemClick}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
