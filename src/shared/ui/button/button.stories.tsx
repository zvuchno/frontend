import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';
import React from 'react';

const container = (width: string, justifySelf: 'center') => {
  return (Story: React.ComponentType) => (
    <div style={{width, justifySelf}}>
      <Story />
    </div>
  )
};

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: { include: ['size', 'disabled', 'styled'] },
  },
  args: { onClick: fn() },
  argTypes: {
    size: {
      control: 'radio',
    },
    disabled: {
      control: 'boolean',
    }
  }
};

export default meta;

type StoryType = StoryObj<typeof Button>;

export const Primary: StoryType = {
  args: {
    variant: 'primary',
    size: 'standart',
    children: 'Button',
    disabled: false,
    styled: false,
  },
  argTypes: {
    size: {
      options: ['standart', 'small']
    }
  },
  decorators: [container('clamp(194px, calc(100vw - 40px), 400px)', 'center')]
};

export const Secondary: StoryType = {
  args: {
    variant: 'secondary',
    size: 'standart',
    children: 'Button',
    disabled: false,
    styled: false,
  },
  argTypes: {
    size: {
      options: ['standart', 'small']
    }
  },
  decorators: [container('clamp(194px, calc(100vw - 40px), 400px)', 'center')]
};

export const AccentDark: StoryType = {
  args: {
    variant: 'accentDark',
    size: 'large',
    children: 'Button',
    disabled: false,
    styled: true,
  },
  argTypes: {
    size: {
      options: ['standart', 'large']
    },
    styled: {
      control: 'boolean',
    }
  },
  decorators: [container('clamp(min(calc(100vw - 40px), 300px), calc(100vw - 40px), 436px)', 'center')]
};

export const AccentLight: StoryType = {
  args: {
    variant: 'accentLight',
    size: 'medium',
    children: 'Button',
    disabled: false,
    styled: false,
  },
  argTypes: {
    size: {
      options: ['medium']
    }
  },
  decorators: [container('284px', 'center')]
};

export const DownloadContent: StoryType = {
  args: {
    variant: 'secondary',
    size: 'small',
    children: 'Button',
    disabled: false,
    styled: false,
    onFileSelect: true
  },
  argTypes: {
    size: {
      options: ['small']
    }
  },
  decorators: [container('204px', 'center')]
};





