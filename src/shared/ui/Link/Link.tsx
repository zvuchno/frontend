import clsx from "clsx";
import NextLink from "next/link";

import s from "./Link.module.scss";
import type { LinkProps } from "./Link.types";

export function Link({ className, children, items, variant = "basic", ...linkProps }: LinkProps) {
  const composedClassName = clsx(s.link, s[`link--${variant}`], className);

  if (!items?.length) {
    return (
      <NextLink className={composedClassName} {...linkProps}>
        {children}
      </NextLink>
    );
  }

  return (
    <span className={s.linkWithItems}>
      <NextLink className={composedClassName} {...linkProps}>
        {children}
      </NextLink>
      <span className={s.linkDropdown}>
        {items.map((item) => (
          <NextLink
            key={item.id}
            href={item.href}
            className={clsx(s.link, s[`link--basic`], s.linkDropdownItem)}
          >
            {item.label}
          </NextLink>
        ))}
      </span>
    </span>
  );
}
