import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import type { ComponentType } from "react";

import { OrderCardListener } from "./OrderCardListener";

const previewDecorator = (Story: ComponentType) => (
  <div
    style={{
      width: "min(100vw - 32px, 720px)",
      padding: "24px",
      background:
        "linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(242, 242, 242) 100%)",
    }}
  >
    <Story />
  </div>
);

const basePreviewImages = [
  { src: "/cassette.png", title: "Кассета Odin Manual" },
  { src: "/record.png", title: "Винил Odin Manual" },
  { src: "/shirt.png", title: "Футболка Odin Manual" },
];

const meta = {
  title: "widget/profile/ui/OrderCardListener",
  component: OrderCardListener,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [previewDecorator],
  args: {
    onDetailsClick: fn(),
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof OrderCardListener>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderNumber: 2415,
    itemsCount: 3,
    totalPrice: 12500,
    previewImages: basePreviewImages,
  },
};

export const WithoutImages: Story = {
  args: {
    orderNumber: 2416,
    itemsCount: 1,
    totalPrice: 4000,
    previewImages: [],
  },
};

export const WithALotOfItems: Story = {
  args: {
    orderNumber: 452,
    itemsCount: 6,
    totalPrice: 18990,
    previewImages: [
      ...basePreviewImages,
      { src: "/recordPlayer.png", title: "Проигрыватель Odin Manual" },
      { src: "/cassette.png", title: "Кассета Live Session" },
      { src: "/record.png", title: "Винил Deluxe Edition" },
    ],
  },
};
