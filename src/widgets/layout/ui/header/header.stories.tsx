import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeaderUI } from './Header';
import React from 'react';
import { DefaultHeaderActions } from '@/shared/constants/headerActions';

const container = () => {
  return (Story: React.ComponentType) => (
    <div style={{
      width: 'clamp(834px, 100vw, 1140px)',
      justifySelf: 'center',
      height: '1500px',
      padding: '32px 36px',
      backgroundColor: '#e7e7e7'
    }}>
      <div style={{
        width: '100%',
        height: '750px',
        maxWidth: '1368px',
        backgroundColor: '#ffffff',
        border: '2px solid #100F0D',
      }}>
        <Story />
      </div>
    </div>
  )
};

const meta: Meta<typeof HeaderUI> = {
  title: 'WIDGETS/Header',
  component: HeaderUI,
  parameters: {
    layout: 'centered',
    controls: { include: ['title'] },
  },
  argTypes: {
    title: {
      control: 'text',
    }
  }
};

export default meta;

type StoryType = StoryObj<typeof HeaderUI>;

export const Header: StoryType = {
  args: {
    actions: DefaultHeaderActions,
    title: 'звучно'
  },
  decorators: [container()]
};




