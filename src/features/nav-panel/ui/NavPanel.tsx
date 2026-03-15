"use client";

import clsx from "clsx";

import styles from "./NavPanel.module.scss";
import type { NavPanelProps } from "./types";

export function NavPanel({ className }: NavPanelProps) {
  return (
    <nav
      className={clsx(styles.navPanel, className)}
      aria-label="Основная навигация"
    >
      <div className={styles.placeholder}>Nav panel preview</div>
    </nav>
  );
}
