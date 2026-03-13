import type { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties } from 'react';
import { HeroUI } from './Hero';

const meta: Meta<typeof HeroUI> = {
  title: 'widget/Main/ui/Hero',
  component: HeroUI,
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            @font-face {
              font-family: 'Feature Mono Custom';
              src: url('/fonts/FeatureMono-Bold.ttf') format('truetype');
              font-weight: 700;
            }
            @font-face {
              font-family: 'Better VCR Custom';
              src: url('/fonts/BetterVCR.woff2') format('woff2');
              font-weight: 400;
            }
          `}
        </style>
        <div style={{ 
          '--font-feature-mono': "'Feature Mono Custom', monospace",
          '--font-better-vcr': "'Better VCR Custom', sans-serif"
        } as CSSProperties}>
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
