import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";

import { ProductCard } from "../../../entities";
import { ButtonLike } from "./ButtonLike";

const productCardArgs = {
  image: {
    src: "https://i.scdn.co/image/7c04200539a69e2a0948836809b484501098c56e",
    alt: "Snowy night cover art",
  },
  title: "ОДИН МАНУЛ",
  description: "Винил ОДИН МАНУЛ (LP, 2025)",
  price: "1 000 ₽",
};

const cardPreviewDecorator = (Story: ComponentType) => (
  <div
    style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "24px",
    }}
  >
    <ProductCard {...productCardArgs} likeButton={<Story />} />
  </div>
);

const meta = {
  title: "features/ButtonLike",
  component: ButtonLike,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [cardPreviewDecorator],
  argTypes: {
    isLiked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ButtonLike>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InitiallyUnliked: Story = {
  args: {
    isLiked: false,
  },
  render: (args) => (
    <ButtonLike key={`button-like-${String(args.isLiked)}`} {...args} />
  ),
};

export const InitiallyLiked: Story = {
  args: {
    isLiked: true,
  },
  render: (args) => (
    <ButtonLike key={`button-like-${String(args.isLiked)}`} {...args} />
  ),
};
