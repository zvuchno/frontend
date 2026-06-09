import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";

const meta = {
  title: "Widgets/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    links: {
      control: "object",
      description: "Массив ссылок навигации",
    },
    telegramUrl: {
      control: "text",
      description: "Ссылка на Telegram",
    },
    copyright: {
      control: "text",
      description: "Текст копирайта",
    },
    className: {
      control: "text",
      description: "Дополнительные CSS классы",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [
      { id: "contacts", label: "Контакты", href: "/contacts" },
      { id: "catalog", label: "Каталог", href: "/catalog/all" },
      { id: "for-artists", label: "Для артистов", href: "/for-artists" },
      { id: "for-fans", label: "Для фанатов", href: "/for-fans" },
      { id: "terms", label: "Условия использования", href: "/terms" },
    ],
    telegramUrl: "https://t.me/zvuchno",
    copyright: "© 2025 «ЗВУЧНО»",
  },
};

export const Minimal: Story = {
  args: {
    links: [
      { id: "contacts", label: "Контакты", href: "/contacts" },
      { id: "catalog", label: "Каталог", href: "/catalog/all" },
    ],
    telegramUrl: "https://t.me/zvuchno",
    copyright: "© 2025 «ЗВУЧНО»",
  },
};

export const CustomCopyright: Story = {
  args: {
    links: [
      { id: "contacts", label: "Контакты", href: "/contacts" },
      { id: "catalog", label: "Каталог", href: "/catalog/all" },
    ],
    telegramUrl: "https://t.me/custom",
    copyright: "© 2025 Ваша Компания",
  },
};
