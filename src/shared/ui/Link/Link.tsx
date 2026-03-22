import clsx from "clsx";
import NextLink from "next/link";

import type { LinkProps } from "./Link.types";
import "./Link.style.scss";

export function Link({
  className,
  children,
  items,
  variant = "basic",
  ...linkProps
}: LinkProps) {
  const composedClassName = clsx("link", `link--${variant}`, className);

  if (!items?.length) {
    return (
      <NextLink className={composedClassName} {...linkProps}>
        {children}
      </NextLink>
    );
  }

  return (
    <span className="linkWithItems">
      <NextLink className={composedClassName} {...linkProps}>
        {children}
      </NextLink>
      <span className="linkDropdown">
        {items.map((item) => (
          <NextLink
            key={item.id}
            href={item.href}
            className={clsx("link", "link--basic", "linkDropdownItem")}
          >
            {item.label}
          </NextLink>
        ))}
      </span>
    </span>
  );
}
