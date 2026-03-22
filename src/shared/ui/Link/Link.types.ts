import type { ComponentPropsWithoutRef, ReactNode } from "react";

type NextLinkProps = ComponentPropsWithoutRef<
  typeof import("next/link").default
>;

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
