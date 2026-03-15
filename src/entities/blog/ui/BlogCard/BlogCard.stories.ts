import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from 'storybook/test';
import BlogCard from './BlogCard';

const meta = {
  title: 'Components/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'text',
      description: 'URL изображения',
    },
    link: {
      control: 'text',
      description: 'Ссылка на статью',
    },
    description: {
      control: 'text',
      description: 'Описание/заголовок статьи',
    },
    hasLink: {
      control: 'boolean',
      description: 'Показывать ли ссылку',
      defaultValue: true,
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof BlogCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://avatars.mds.yandex.net/i?id=2b49f18a1239d68def51de89f1d3c415c83ea222-8236365-images-thumbs&n=13',
    link: '/blog/example',
    description: 'Почему музыкальные релизы выходят по пятницам?',
    hasLink: true,
  },
};

export const WithoutLink: Story = {
  args: {
    image: 'https://avatars.mds.yandex.net/i?id=2b49f18a1239d68def51de89f1d3c415c83ea222-8236365-images-thumbs&n=13',
    description: 'Как создать идеальный плейлист',
    hasLink: false,
  },
};

export const WithLongTitle: Story = {
  args: {
    image: 'https://avatars.mds.yandex.net/i?id=2b49f18a1239d68def51de89f1d3c415c83ea222-8236365-images-thumbs&n=13',
    link: '/blog/long-title',
    description: 'Почему музыкальные релизы выходят по пятницам и как это влияет на индустрию',
    hasLink: true,
  },
};

export const WithCustomClick: Story = {
  args: {
    image: 'https://avatars.mds.yandex.net/i?id=2b49f18a1239d68def51de89f1d3c415c83ea222-8236365-images-thumbs&n=13',
    description: 'Карточка с кастомным обработчиком клика',
    hasLink: false,
  },
};