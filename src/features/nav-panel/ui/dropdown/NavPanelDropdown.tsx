import clsx from "clsx";

import { Link } from "@/shared/ui/Link/Link";

import styles from "./NavPanelDropdown.module.scss";
import type { NavPanelDropdownItem } from "../types";

type NavPanelDropdownProps = {
  className?: string;
  items: readonly NavPanelDropdownItem[];
};

export function NavPanelDropdown({
  className,
  items,
}: NavPanelDropdownProps) {
  return (
    <div className={clsx(styles.dropdown, className)}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={styles.link}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
