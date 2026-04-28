import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";

import { ButtonLike } from "../../../features";
import { ProductCard } from "./ProductCard";

const previewDecorator = (Story: ComponentType) => (
  <div
    style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "24px",
    }}
  >
    <Story />
  </div>
);

const imageSrc =
  "https://i.scdn.co/image/7c04200539a69e2a0948836809b484501098c56e";

const meta = {
  title: "entities/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [previewDecorator],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    likeButton: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: imageSrc,
    title: "ОДИН МАНУЛ",
    description: "Винил ОДИН МАНУЛ (LP, 2025)",
    price: "1000",
  },
  render: (args) => (
    <ProductCard {...args} likeButton={<ButtonLike isLiked={false} />} />
  ),
};

export const Liked: Story = {
  args: {
    image: imageSrc,
    title: "ОДИН МАНУЛ",
    description: "Винил ОДИН МАНУЛ (LP, 2025)",
    price: "1000",
  },
  render: (args) => (
    <ProductCard {...args} likeButton={<ButtonLike isLiked />} />
  ),
};

export const LongText: Story = {
  args: {
    image: imageSrc,
    title: "ОДИН МАНУЛ DELUXE EDITION",
    description: "Винил ОДИН МАНУЛ Deluxe Gatefold Edition (LP, 2025)",
    price: "12500",
  },
  render: (args) => (
    <ProductCard {...args} likeButton={<ButtonLike isLiked={false} />} />
  ),
};
