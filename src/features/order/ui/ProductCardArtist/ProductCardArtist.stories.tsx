import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductCardArtist } from "./ProductCardArtist";

const meta = {
  title: "features/order/ProductCardArtist",
  component: ProductCardArtist,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCardArtist>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  args: {
    id: "product-card-artist-placeholder",
    image: "/placeholder-product-card-artist.png",
    definitions: [
      { value: "Placeholder" },
      { label: "Тип", value: "Черновик" },
      { label: "Кол-во", value: "1 шт" },
    ],
  },
};
