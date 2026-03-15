import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ProfileForm } from './ProfileForm';
import React from 'react';
import { ApiRequestStatus } from './types';

const container = (width: string) => {
  return (Story: React.ComponentType) => (
    <div style={{
      width,
      justifySelf: 'center',
      border: '1px dotted #a3a3a3'
    }}>
      <Story />
    </div>
  )
};

const meta: Meta<typeof ProfileForm> = {
  title: 'features/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'centered',
    controls: { include: [] },
  },
  args: { onClick: fn() },
  argTypes: {}
};

export default meta;

type StoryType = StoryObj<typeof ProfileForm>;

export const ProfileFormMain: StoryType = {
  args: {
    children: <div style={{width: '100%', height: '266px'}}></div>,
    requestStatus: ApiRequestStatus.IDLE,
    title: 'Профиль',
    error: null,
    onChange: () => {},
    onSubmit: () => {},
    noValidate: false,
  },
  argTypes: {},
  decorators: [container('clamp(200px, 57.92vw, 834px)')]
};

