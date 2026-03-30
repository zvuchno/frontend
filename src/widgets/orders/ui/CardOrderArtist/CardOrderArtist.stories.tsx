import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardOrderArtist } from './CardOrderArtist';

const meta: Meta<typeof CardOrderArtist> = {
  title: 'widget/Orders/ui/CardOrderArtist',
  component: CardOrderArtist,
  decorators: [
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
