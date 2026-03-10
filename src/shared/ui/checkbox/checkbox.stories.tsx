import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckboxUI } from './CheckboxUI';
import React, { useState } from 'react';
import { fn } from 'storybook/test';

const container = (width: string) => 
  (Story: React.ComponentType) => (
    <div style={{ 
      width, 
      justifySelf: 'center', 
      border: '1px dotted #acacac' 
    }}>
      <Story />
    </div>
  );

const meta: Meta<typeof CheckboxUI> = {
  title: 'UI/Checkbox',
  component: CheckboxUI,
  parameters: {
    layout: 'centered',
    controls: { include: ['children', 'isChecked', 'disabled'] },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    isChecked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onChange: {
      action: 'onChange triggered',
    },
  },
  args: { 
    onChange: fn() 
  }
};

export default meta;

type StoryType = StoryObj<typeof CheckboxUI>;

export const CheckboxButton: StoryType = {
  render: (args) => {
    const [checkStatus, setIsChecked] = useState(args.isChecked);

    const handleChange = () => {
      const newStatus = !checkStatus;
      setIsChecked(newStatus);
      args.onChange?.(newStatus);
    }

    return (
      <CheckboxUI
      {...args}
      isChecked={checkStatus}
      onChange={handleChange}
      />
    );
  },
  args: {
    type: 'checkbox',
    children: 'Согласен с условиями  Правил пользования торговой площадкой и Правилами возврата',
    disabled: false,
    isChecked: false,
  },
  decorators: [container('clamp(194px, calc(100vw - 40px), 394px)')]
};

export const RadioButton: StoryType = {
  args: {
    type: 'radio',
    children: 'СДЭК - курьером до двери',
    disabled: false,
    isChecked: false
  },
  decorators: [container('clamp(194px, calc(100vw - 40px), 392px)')]
};

export const RadioButtonGroup: StoryType = {
  args: {
    children: '',
    isChecked: false,
    disabled: false
  },

  render: (args) => {
    const [selected, setSelected] = useState('sdek');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <CheckboxUI
          {...args}
          type='radio'
          name='delivery'
          value='sdek'
          isChecked={selected === 'sdek'}
          onChange={() => setSelected('sdek')}
        >
          СДЭК - курьером до двери
        </CheckboxUI>
        
        <CheckboxUI
          {...args}
          type='radio'
          name='delivery'
          value='pickup'
          isChecked={selected === 'pickup'}
          onChange={() => setSelected('pickup')}
        >
          СДЭК - пункт выдачи
        </CheckboxUI>
      </div>
    );
  },

  decorators: [container('clamp(194px, calc(100vw - 40px), 392px)')]
};
