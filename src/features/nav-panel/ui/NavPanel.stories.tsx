import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";

import { NavPanel } from "./NavPanel";

const previewDecorator = (Story: ComponentType) => (
  <div
    style={{
      minHeight: "360px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: "36px",
      }}
    />
    <div
      style={{
        padding: "18px",
        border: "2px solid #100f0d",
        background: "#0046D3",
      }}
    >
      <Story />
    </div>
    <div
      style={{
        marginTop: "40px",
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

export const DropdownOpen: Story = {
  args: {
    defaultOpenItemId: "catalog",
  },
  render: (args) => <NavPanel key={String(args.defaultOpenItemId)} {...args} />,
};
