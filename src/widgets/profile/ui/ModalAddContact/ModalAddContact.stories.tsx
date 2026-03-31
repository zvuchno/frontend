import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import ModalAddContact from './ModalAddContact';
import { TFieldValues } from './ModalAddContact.type';

const meta: Meta<typeof ModalAddContact> = {
  title: 'widgets/profile/ui/ModalAddContact',
  component: ModalAddContact,
  parameters: {
    layout: 'centered',
  },
  args: { 
    onClose: fn(),
    onSubmit: fn()
  }
};

export default meta;

type StoryType = StoryObj<typeof ModalAddContact>;

const ModalDemo = ({ variant }: {variant: 'contact' | 'link' }) => {

  const [isOpen, setIsOpen] = useState(false);

  const save = (data: TFieldValues) => {
    console.log('Сохранить:', JSON.stringify(data));
  };

  return (
    <div 
      style={{ 
        position: 'relative',
        width: 'calc(100vw - 100px)',
        height: 'calc(100vh - 100px)',
        justifyItems: 'center',
      }}
    >
      <button type='button' onClick={() => setIsOpen(true)}>
        {variant === 'contact' ? 'Добавить контакт' : 'Добавить ссылку'}
      </button>
      
      <ModalAddContact
        variant={variant}
        onClose={() => setIsOpen(false)}
        onSubmit={save}
        isOpen={isOpen}
      />
      
    </div>
  );
};

export const ModalAddContactForContact: StoryType = {
  render: () => {
    return (
      <ModalDemo variant='contact' />
    )
  }
};

export const ModalAddContactForLink: StoryType = {
  render: () => {
    return (
      <ModalDemo variant='link' />
    )
  }
};