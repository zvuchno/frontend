import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type Link from "next/link";

type NextLinkProps = ComponentPropsWithoutRef<typeof Link>;

export type LinkVariant = "basic" | "outlined";

export type LinkItem = {
  id: string;
  href: NextLinkProps["href"];
  label: ReactNode;
};

export type LinkProps = NextLinkProps & {
  children: ReactNode;
  className?: string;
  items?: readonly LinkItem[];
  variant?: LinkVariant;
};
