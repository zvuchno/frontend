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

export const Merch: Story = {
  args: {
    id: "product-card-artist-merch",
    image: "/shirt.png",
    definitions: [
      { value: "Футболка от ACDC" },
      { label: "Размер", value: "L" },
      { label: "Кол-во", value: "1 шт" },
    ],
  },
};

export const Vinyl: Story = {
  args: {
    id: "product-card-artist-vinyl",
    image: "/record.png",
    definitions: [
      { value: 'Виниловый альбом "Мы не спали, мы...' },
      { label: "Тип", value: "Винил" },
      { label: "Кол-во", value: "1 шт" },
    ],
  },
};
