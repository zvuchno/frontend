import clsx from "clsx";
import NextLink from "next/link";

import type { LinkProps } from "./Link.types";
import "./Link.style.scss";

export function Link({ className, ...props }: LinkProps) {
  return <NextLink className={clsx("link", className)} {...props} />;
}
