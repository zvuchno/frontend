import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagUI } from './Tag';

const meta: Meta<typeof TagUI> = {
    title: 'shared/ui/Tag',
    component: TagUI,
    args: {
      title: 'Электронная музыка',
      onTagClick: () => {console.log('tag has been clicked!')},
      onIconClick: () => {console.log('icon has been clicked!')},
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
};

export const ActiveTag: Story = {
  args: {
    isActive: true,
    title: 'Все',
  }
};

export const SecondaryTag: Story = {
  args: {
    isSecondary: true,
    title: 'Футболки',
  }
};

export const WithArrowIcon: Story = {
  args: {
    title: 'по новизне',
    icon: 'arrow',
  }
};

export const WithXCircleIcon: Story = {
  args: {
    title: 'Мерч',
    isActive: true,
    icon: 'x-circle',
  }
};