import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalUI } from './ModalUI';
import React, { useEffect, useRef, useState } from 'react';
import { fn } from 'storybook/test';

const meta: Meta<typeof ModalUI> = {
  title: 'shared/ui/Modal',
  component: ModalUI,
  parameters: {
    layout: 'centered',
  },
  args: { 
    onClose: fn()
  }
};

export default meta;

type StoryType = StoryObj<typeof ModalUI>;

const ModalDemo = ({ children, closeButtonStyle }: { children: React.ReactNode, closeButtonStyle: 'x' | 'circledX' }) => {
  const [isOpen, setIsOpen] = useState(true);

  const mainPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainPageRef.current) {
      if (isOpen) {
        mainPageRef.current.style.overflow = 'hidden';
      } else {
        mainPageRef.current.style.overflow = 'auto';
      }
    }
  }, [isOpen]);

  return (
    <div 
      ref={mainPageRef}
      style={{ 
        position: 'relative',
        width: 'calc(100vw - 100px)',
        height: 'calc(100vh - 100px)',
        fontSize: '50px',
        textTransform: 'uppercase',
        justifyItems: 'center',
      }}
    >
      <button type='button' onClick={() => setIsOpen(true)}>
        Открыть модальное окно
      </button>
      
      {Array.from({ length: 15 }, (_, i) => (
        <p key={i}>Основной контент страницы</p>
      ))}
      
      <ModalUI 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeButtonStyle={closeButtonStyle}
      >
        {children}
      </ModalUI>
    </div>
  );
};

export const ModalCrossButton: StoryType = {
  render: () => 
    <ModalDemo closeButtonStyle="x">
      <div 
        style={{ 
          padding: '20px',
          fontSize: '2rem',
          textTransform: 'none'
        }}
      >
        {'Контент модального окна'}
      </div>
    </ModalDemo>
};

export const ModalCircledCrossButton: StoryType = {
   render: () => 
    <ModalDemo closeButtonStyle="circledX">
      <div 
        style={{
          width: '250px',
          paddingInline: '2rem',
          paddingBlock: '8rem',
          fontSize: '2rem',
          textTransform: 'none'
        }}
      >
        Контент модального окна
      </div>
    </ModalDemo>
};