import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ButtonAddLink } from "./ButtonAddLink";

const meta = {
  title: "features/ButtonAddLink",
  component: ButtonAddLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "483px", maxWidth: "100vw", padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ButtonAddLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const links = [
  { id: 1, label: "Букинг", value: "booking@gmail.com" },
  { id: 2, label: "Менеджер", value: "manager@gmail.com" },
  { id: 3, label: "PR", value: "pr@gmail.com" },
  { id: 4, label: "Telegram", value: "https://t.me/artist" },
];

export const Default: Story = {
  args: {
    items: links.slice(0, 2),
    addButtonText: "Добавить контакт",
    onAddClick: () => undefined,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Контакты",
    items: links.slice(0, 2),
    addButtonText: "Добавить контакт",
    onAddClick: () => undefined,
  },
};

export const Scrollable: Story = {
  args: {
    items: links,
    addButtonText: "Добавить соцсеть",
    onAddClick: () => undefined,
  },
};
