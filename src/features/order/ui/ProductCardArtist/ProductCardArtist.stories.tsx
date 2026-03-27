import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";

import { ProductCardArtist } from "./ProductCardArtist";
import type { ProductCardArtistData } from "./types";

const previewDecorator = (Story: ComponentType) => (
  <div
    style={{
      display: "grid",
      placeItems: "center",
      padding: "24px",
    }}
  >
    <Story />
  </div>
);

const meta = {
  title: "features/order/ProductCardArtist",
  component: ProductCardArtist,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [previewDecorator],
} satisfies Meta<typeof ProductCardArtist>;

export default meta;

type Story = StoryObj<typeof meta>;

const merchArgs: ProductCardArtistData = {
  id: "product-card-artist-merch",
  image: "/shirt.png",
  imageWidth: 139,
  imageHeight: 139,
  variant: "merch",
  definitions: [
    { label: "Футболка", value: "от ACDC" },
    { label: "Размер", value: "L" },
    { label: "Кол-во", value: "1 шт" },
  ],
};

const musicArgs: ProductCardArtistData = {
  id: "product-card-artist-music",
  image: "/record.png",
  imageWidth: 126,
  imageHeight: 119,
  variant: "music",
  definitions: [
    { label: "Виниловый альбом", value: '"Мы не..."' },
    { label: "Тип", value: "Винил" },
    { label: "Кол-во", value: "1 шт" },
  ],
};

export const Merch: Story = {
  args: merchArgs,
};

export const Music: Story = {
  args: musicArgs,
};

export const LongText: Story = {
  args: {
    ...musicArgs,
    id: "product-card-artist-long-text",
    definitions: [
      {
        label: "Виниловый альбом",
        value: '"Мы не спали, мы смотрели на звезды и ждали утро"',
      },
      { label: "Тип", value: "Винил" },
      { label: "Кол-во", value: "1 шт" },
    ],
  },
};

export const ListPreview: Story = {
  args: merchArgs,
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        width: "min(100%, 420px)",
      }}
    >
      <ProductCardArtist {...merchArgs} />
      <ProductCardArtist {...musicArgs} />
      <ProductCardArtist
        {...merchArgs}
        id="product-card-artist-list-third"
        definitions={[
          { label: "Худи", value: "от The Clash" },
          { label: "Размер", value: "XL" },
          { label: "Кол-во", value: "2 шт" },
        ]}
      />
    </div>
  ),
};
