import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from 'storybook/test';
import SearchInput from './SearchInput';

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение поля поиска',
    },
    placeholder: {
      control: 'text',
      description: 'Текст placeholder',
    },
    label: {
      control: 'text',
      description: 'Текст лейбла (опционально, использует Text компонент)',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения значения',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Обработчик отправки формы',
    },
    onClear: {
      action: 'cleared',
      description: 'Обработчик очистки поля',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключено ли поле',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
  },
  args: { 
    onChange: fn(), 
    onSubmit: fn(),
    onClear: fn()
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Найти товары',
    disabled: false,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Поиск',
    placeholder: 'Найти товары',
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Найти товары',
    value: 'Музыкальные релизы',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Найти товары',
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Найти артиста...',
    disabled: false,
  },
};