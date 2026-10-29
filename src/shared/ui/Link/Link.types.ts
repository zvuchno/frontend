import type { ComponentPropsWithoutRef, ComponentType, ReactNode, SVGProps } from "react";

import type Link from "next/link";

export type NextLinkProps = ComponentPropsWithoutRef<typeof Link>;

export type LinkVariant = "basic" | "outlined";

export type LinkItem = {
  id: string;
  href: NextLinkProps["href"];
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export type LinkProps = NextLinkProps & {
  children: ReactNode;
  className?: string;
  items?: readonly LinkItem[];
  variant?: LinkVariant;
};
