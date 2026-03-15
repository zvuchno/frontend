import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";

import { NavPanel } from "./NavPanel";

const previewDecorator = (Story: ComponentType) => (
  <div
    style={{
      minHeight: "320px",
      padding: "0 0 160px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: "92px",
        paddingTop: "28px",
      }}
    />
    <Story />
    <div
      style={{
        marginTop: "48px",
        height: "220px",
      }}
    />
  </div>
);

const meta = {
  title: "features/NavPanel",
  component: NavPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [previewDecorator],
} satisfies Meta<typeof NavPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
