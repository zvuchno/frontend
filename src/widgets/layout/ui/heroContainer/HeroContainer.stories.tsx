import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroContainer } from "./HeroContainer";

const mockContent = {
  eyebrow: "Reusable layout shell",
  title: "HeroContainer",
  description:
    "Базовый контейнер для секций и страниц. Точные стили будут уточнены по Figma на этапе стилизации.",
};

const contentStyles: CSSProperties = {
  display: "grid",
  gap: "16px",
};

const meta = {
  title: "Widgets/Layout/HeroContainer",
  component: HeroContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "min(100vw - 32px, 1368px)",
          padding: "24px 0 40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={contentStyles}>
        <span>{mockContent.eyebrow}</span>
        <h2>{mockContent.title}</h2>
        <p>{mockContent.description}</p>
      </div>
    ),
    style: {
      padding: "32px 24px",
    },
  },
};

export const WithCustomPadding: Story = {
  args: {
    children: (
      <div style={contentStyles}>
        <span>{mockContent.eyebrow}</span>
        <h2>Custom spacing</h2>
        <p>
          Внешние отступы и локальная компоновка управляются через пропсы
          потребителя.
        </p>
      </div>
    ),
    style: {
      padding: "80px 64px 48px",
    },
  },
};
