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
    <dl>
      <Definition {...args} />
    </dl>
  ),
};
