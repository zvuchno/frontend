import type { FC, ElementType, JSX } from "react";

import type {
  TextTag,
  TitleTag,
  TypographyDefaults,
  TypographyProps,
} from "./Typography.types";

const withTypography = <TDefaultTag extends ElementType = "span">(
  defaults: TypographyDefaults<TDefaultTag>,
) => {
  return function TypographyComponent<TTag extends ElementType = TDefaultTag>({
    Tag,
    children,
    variant,
    ...props
  }: TypographyProps<TTag>): JSX.Element {
    const Component = (Tag ?? defaults.Tag ?? "span") as ElementType;
    const resolvedVariant = variant ?? defaults.variant ?? "normal";

    return (
      <Component data-variant={resolvedVariant} {...props}>
        {children}
      </Component>
    );
  };
};

export const Typography: FC<TypographyProps> = withTypography({});

export const Text: FC<TypographyProps<TextTag>> = withTypography<TextTag>({
  Tag: "span",
  variant: "normal",
});

export const Title: FC<TypographyProps<TitleTag>> = withTypography<TitleTag>({
  Tag: "h3",
  variant: "title",
});
