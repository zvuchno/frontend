import type { ComponentPropsWithoutRef } from "react";

type NextLinkProps = ComponentPropsWithoutRef<
  typeof import("next/link").default
>;

export type LinkVariant = "basic" | "outlined";

export type LinkProps = NextLinkProps & {
  variant?: LinkVariant;
};
