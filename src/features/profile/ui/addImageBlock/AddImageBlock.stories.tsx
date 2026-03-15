import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddImageBlock } from "./AddImageBlock";
import { CSSProperties } from 'react';

const meta: Meta<typeof AddImageBlock> = {
  title: 'features/profile/ui/AddImageBlock',
  component: AddImageBlock,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            @font-face {
              font-family: 'Feature Mono Custom';
              src: url('/fonts/FeatureMono-Medium.ttf') format('truetype');
              font-weight: 500;
            }
          `}
        </style>
        <div style={{ 
          'width': '945px',
          '--font-feature-mono': "'Feature Mono Custom', monospace",
        } as CSSProperties}>
          <Story />
        </div>
      </>
    ),
  ],
};


export default meta;

type Story = StoryObj<typeof AddImageBlock>;

export const Default: Story = {};