import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Link } from "./Link";

const meta = {
  title: "Shared/UI/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "inline-radio",
      options: ["basic", "outlined"],
    },
  },
  args: {
    href: "#",
    children: "Для подписчиков",
    variant: "basic",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Outlined: Story = {
  args: {
    children: "главная",
    variant: "outlined",
  },
};
