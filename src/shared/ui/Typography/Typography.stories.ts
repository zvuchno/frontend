import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { createElement } from "react";

import type { TextTag, TitleTag, TypographyProps } from "./Typography.types";
import { Text, Title, Typography } from "./Typography";

const typographyTagOptions = [
  "span",
  "p",
  "label",
  "strong",
  "em",
  "small",
  "b",
  "i",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
] as const;

const textTagOptions = [
  "span",
  "p",
  "label",
  "strong",
  "em",
  "small",
  "b",
  "i",
] as const;

const titleTagOptions = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

const meta = {
  title: "shared/ui/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    Tag: "p",
    children: "Место, где нет барьера между артистами и слушателями.",
    variant: "normal",
  },
  argTypes: {
    Tag: {
      control: "select",
      options: typographyTagOptions,
    },
    children: {
      control: "text",
    },
    className: {
      control: false,
    },
    variant: {
      control: "inline-radio",
      options: ["normal", "title"],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => createElement(Typography, args, args.children),
};

export const TextPreset: Story = {
  args: {
    Tag: "p",
    children: "Следите за новостями в нашем телеграм-канале.",
    variant: "normal",
  },
  argTypes: {
    Tag: {
      control: "select",
      options: textTagOptions,
    },
    variant: {
      control: false,
    },
  },
  render: (args) =>
    createElement(Text, args as TypographyProps<TextTag>, args.children),
};

export const TitlePreset: Story = {
  args: {
    Tag: "h3",
    children: "Артисты",
    variant: "title",
  },
  argTypes: {
    Tag: {
      control: "select",
      options: titleTagOptions,
    },
    variant: {
      control: false,
    },
  },
  render: (args) =>
    createElement(Title, args as TypographyProps<TitleTag>, args.children),
};

export const MockupRhythm: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () =>
    createElement(
      "section",
      {
        style: {
          display: "grid",
          gap: "24px",
          maxWidth: "720px",
          padding: "32px",
          background:
            "linear-gradient(180deg, rgba(242, 242, 242, 1) 0%, rgba(230, 234, 240, 1) 100%)",
          borderRadius: "24px",
        },
      },
      [
        createElement(Title, { key: "artists" }, "Артисты"),
        createElement(
          Text,
          {
            key: "artists-copy",
            Tag: "p",
            style: { maxWidth: "46ch" },
          },
          "Место, где нет барьера между артистами и слушателями.",
        ),
        createElement(Title, { key: "music" }, "Музыка"),
        createElement(
          Typography,
          {
            key: "music-copy",
            Tag: "p",
            variant: "normal",
            style: { maxWidth: "46ch" },
          },
          "Подзаголовки и описания в макете заметно компактнее и спокойнее, чем секционные заголовки.",
        ),
        createElement(Title, { key: "faq", Tag: "h4" }, "FAQ"),
      ],
    ),
};
