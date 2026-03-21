import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType } from "react";

import { Definition } from "./Definition";

const previewWidth = "min(calc(100vw - 40px), 32rem)";

const singleDefinitionDecorator = (Story: ComponentType) => (
  <div
    style={{
      width: previewWidth,
    }}
  >
    <dl
      style={{
        margin: 0,
        width: "100%",
      }}
    >
      <Story />
    </dl>
  </div>
);

const meta = {
  title: "shared/ui/Definition",
  component: Definition,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [singleDefinitionDecorator],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    markerTone: {
      control: "inline-radio",
      options: ["label", "value"],
    },
  },
  args: {
    label: "Статус",
    value: "Доставлен",
    markerTone: "value",
  },
} satisfies Meta<typeof Definition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNumericValue: Story = {
  args: {
    label: "Треков",
    value: 12,
    markerTone: "label",
  },
};

export const LongContent: Story = {
  args: {
    label: "Статус отправления",
    value: "Доставлен в пункт выдачи и ожидает получения получателем",
    markerTone: "value",
  },
};

export const InDefinitionList: Story = {
  decorators: [],
  render: () => (
    <div
      style={{
        width: previewWidth,
      }}
    >
      <dl
        style={{
          margin: 0,
          width: "100%",
          display: "grid",
          gap: "0.5rem",
        }}
      >
        <Definition label="Статус" value="Доставлен" markerTone="value" />
        <Definition label="Заказ" value="№ 10482" />
        <Definition label="Треков" value={12} />
      </dl>
    </div>
  ),
};
