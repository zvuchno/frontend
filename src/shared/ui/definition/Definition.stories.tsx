import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Definition } from "./Definition";

const meta = {
  title: "shared/ui/Definition",
  component: Definition,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    termClassName: {
      table: {
        disable: true,
      },
    },
    descriptionClassName: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    term: "Статус",
    description: "Доставлен",
  },
} satisfies Meta<typeof Definition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div
      style={{
        width: "min(calc(100vw - 40px), 32rem)",
      }}
    >
      <dl
        style={{
          margin: 0,
          width: "100%",
        }}
      >
        <Definition {...args} />
      </dl>
    </div>
  ),
};
