import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardFAQUI } from './CardFAQ';

const meta: Meta<typeof CardFAQUI> = {
    title: 'shared/ui/AccordeonCard',
    component: CardFAQUI,
    args: {
      label: (<p>Когда запуск?</p>),
      children: (<p>Дай Бог в конце лета</p>),
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
};
