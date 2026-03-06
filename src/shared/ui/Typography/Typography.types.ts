import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type TypographyVariant = 'normal' | 'title';

export type TextTag =
  | 'span'
  | 'p'
  | 'label'
  | 'strong'
  | 'em'
  | 'small'
  | 'b'
  | 'i';

export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyBaseProps<TTag extends ElementType> = {
  Tag?: TTag;
  children?: ReactNode;
  className?: string;
  variant?: TypographyVariant;
};

export type TypographyProps<TTag extends ElementType = 'span'> = TypographyBaseProps<TTag> &
  Omit<ComponentPropsWithoutRef<TTag>, keyof TypographyBaseProps<TTag>>;

export type TypographyDefaults<TTag extends ElementType = 'span'> = Partial<
  Pick<TypographyProps<TTag>, 'Tag' | 'variant'>
>;
