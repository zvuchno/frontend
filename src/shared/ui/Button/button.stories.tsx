import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ButtonUI } from './ButtonUI';
import React from 'react';

const container = (width: string) => {
  return (Story: React.ComponentType) => (
    <div style={{
      width,
      justifySelf: 'center'
    }}>
      <Story />
    </div>
  )
};

const meta: Meta<typeof ButtonUI> = {
  title: 'shared/ui/Button',
  component: ButtonUI,
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

type StoryType = StoryObj<typeof ButtonUI>;

export const Primary: StoryType = {
  args: {
    variant: 'primary',
    size: 'standart',
    children: 'Button',
    disabled: false,
  },
  argTypes: {
    size: {
      options: ['standart', 'small']
    }
  },
  decorators: [container('clamp(194px, calc(100vw - 40px), 400px)')]
};

export const Secondary: StoryType = {
  args: {
    variant: 'secondary',
    size: 'standart',
    children: 'Button',
    disabled: false,
  },
  argTypes: {
    size: {
      options: ['standart', 'small']
    }
  },
  decorators: [container('clamp(194px, calc(100vw - 40px), 400px)')]
};

export const AccentDarkLarge: StoryType = {
  args: {
    variant: 'accentDark',
    size: 'large',
    children: 
    <span 
      style={{
        fontSize: '28px', 
        textTransform: 'uppercase'
      }}
    >
      Button
    </span>,
    disabled: false,
  },
  argTypes: {
    size: {
      options: ['large']
    }
  },
  decorators: [container('clamp(min(calc(100vw - 40px), 300px), calc(100vw - 40px), 436px)')]
};

export const AccentDarkStandart: StoryType = {
  args: {
    variant: 'accentDark',
    size: 'standart',
    children: 'Button',
    disabled: false,
  },
  argTypes: {
    size: {
      options: ['standart']
    }
  },
  decorators: [container('clamp(min(calc(100vw - 40px), 300px), calc(100vw - 40px), 436px)')]
};

export const OrderDetailsButton: StoryType = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Button',
    disabled: false,
  },
  argTypes: {
    size: {
      options: ['medium']
    }
  },
  decorators: [container('284px')]
};

export const ContentDownloadButton: StoryType = {
  args: {
    variant: 'secondary',
    size: 'small',
    children: 
      <span 
        style={{
          fontSize: '16px',
          fontWeight: '500'
        }}
      >
        Button
      </span>,
    disabled: false,
  },
  argTypes: {
    size: {
      options: ['small']
    }
  },
  decorators: [container('204px')]
};





