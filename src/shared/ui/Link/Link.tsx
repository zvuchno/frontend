import clsx from "clsx";
import NextLink from "next/link";

import type { LinkProps } from "./Link.types";
import "./Link.style.scss";

export function Link({ className, variant = "basic", ...props }: LinkProps) {
  return (
    <NextLink
      className={clsx("link", `link--${variant}`, className)}
      {...props}
    />
  );
}
