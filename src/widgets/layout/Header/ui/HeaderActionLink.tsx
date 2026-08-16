import Link from "next/link";
import { type UrlObject } from "url";

import { HeaderCartWithCounter } from "@/shared/ui";

import { type THeaderAction } from "../config/headerActions";
import styles from "./header.module.scss";

export const HeaderActionLink = ({
  action,
  count,
  link,
  onHandleClick,
}: {
  action: THeaderAction;
  count: number;
  link?: string | UrlObject;
  onHandleClick: () => void;
}) => (
  <li key={action.title} className={styles.headerAction} aria-label={action.title}>
    {action.type === "button" && (
      <button
        type='button'
        title={action.title}
        disabled={false}
        aria-disabled={false}
        onClick={onHandleClick}
      >
        {action.children}
      </button>
    )}
    {action.type === "link" && action.href && (
      <Link title={action.title} href={link ?? action.href} prefetch={false}>
        {action.title === "Корзина" ? <HeaderCartWithCounter items={count} /> : action.children}
      </Link>
    )}
  </li>
);
