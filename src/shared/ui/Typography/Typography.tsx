import clsx from "clsx";
import type { ElementType, JSX } from "react";

import type {
  TextTag,
  TitleTag,
  TypographyComponent,
  TypographyDefaults,
  TypographyProps,
} from "./Typography.types";

const withTypography = <
  TAllowedTag extends ElementType = ElementType,
  TDefaultTag extends TAllowedTag = TAllowedTag,
>(
  defaults: TypographyDefaults<TDefaultTag>,
) => {
  return function TypographyComponent<TTag extends TAllowedTag = TDefaultTag>({
    Tag,
    children,
    className,
    variant,
    ...props
  }: TypographyProps<TTag>): JSX.Element {
    const Component = (Tag ?? defaults.Tag ?? "span") as ElementType;
    const resolvedVariant = variant ?? defaults.variant ?? "normal";
    const resolvedClassName = clsx(
      "typography",
      `typography--${resolvedVariant}`,
      className,
    );

    return (
      <Component
        className={resolvedClassName}
        data-variant={resolvedVariant}
        {...props}
      >
        {children}
      </Component>
    );
  } as TypographyComponent<TAllowedTag, TDefaultTag>;
};

export const Typography = withTypography<ElementType, "span">({});

export const Text = withTypography<TextTag, "span">({
  Tag: "span",
  variant: "normal",
});

export const Title = withTypography<TitleTag, "h3">({
  Tag: "h3",
  variant: "title",
});
