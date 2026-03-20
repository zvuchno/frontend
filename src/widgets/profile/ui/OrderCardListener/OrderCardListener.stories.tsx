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

const basePreviewImages = ["/cassette.png", "/record.png", "/shirt.png"];

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
    orderNumber: "2415",
    itemsCount: 3,
    totalPrice: "12 500 ₽",
    previewImages: basePreviewImages,
  },
};

export const WithoutImages: Story = {
  args: {
    orderNumber: "2416",
    itemsCount: 2,
    totalPrice: "4 000 ₽",
    previewImages: [],
  },
};

export const WithoutTotalPrice: Story = {
  args: {
    orderNumber: "2417",
    itemsCount: 1,
    totalPrice: null,
    previewImages: ["/recordPlayer.png"],
  },
};

export const WithLongOrderNumber: Story = {
  args: {
    orderNumber: "2026-03-20-LISTENER-ORDER-00000018452",
    itemsCount: 4,
    totalPrice: "18 990 ₽",
    previewImages: basePreviewImages,
  },
};
