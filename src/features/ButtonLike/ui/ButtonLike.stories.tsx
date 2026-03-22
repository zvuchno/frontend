import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";

import { ButtonLike } from "./ButtonLike";

const cardPreviewDecorator = (Story: ComponentType) => (
  <div
    style={{
      padding: "24px",
      background:
        "linear-gradient(180deg, rgb(242, 242, 242) 0%, rgb(219, 219, 219) 100%)",
      borderRadius: "24px",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "224px",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgb(248, 192, 228) 0%, rgb(240, 215, 245) 36%, rgb(208, 221, 255) 100%)",
        boxShadow: "0 10px 24px rgba(16, 15, 13, 0.18)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 26% 28%, rgba(255, 255, 255, 0.75) 0 10%, transparent 11%), radial-gradient(circle at 71% 58%, rgba(255, 255, 255, 0.55) 0 8%, transparent 9%), linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
      <div
        style={{
          position: "absolute",
          left: "14px",
          right: "14px",
          bottom: "14px",
          display: "grid",
          gap: "4px",
          color: "#100f0d",
          fontFamily: '"Feature Mono", monospace',
        }}
      >
        <strong
          style={{
            fontSize: "16px",
            lineHeight: 1,
            letterSpacing: "-0.08em",
          }}
        >
          OKNA
        </strong>
        <span
          style={{
            fontSize: "12px",
            lineHeight: 1.2,
            letterSpacing: "-0.04em",
          }}
        >
          Cassette Odin Manual (LP, 2025)
        </span>
        <span
          style={{
            fontSize: "14px",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          1 000 RUB
        </span>
      </div>
    </div>
  </div>
);

const meta = {
  title: "features/ButtonLike",
  component: ButtonLike,
  parameters: {
    layout: "centered",
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
