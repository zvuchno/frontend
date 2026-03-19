import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileFormUI } from './ProfileForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const meta: Meta<typeof ProfileFormUI> = {
  title: 'features/ProfileForm',
  component: ProfileFormUI,
  parameters: {
    layout: 'centered',
    controls: { include: ['role'] },
  },
  decorators: [
    (Story, { args }) => {
      const methods = useForm({
        defaultValues: { 
          name: '',
          phone: '',
          email: '',
          password: '',
          city: '',
          url: ''
        },
      });
      
      useEffect(() => {
        const timer = setTimeout(() => {
          if (args.errors) {
            Object.entries(args.errors).forEach(([name, error]: [any, any]) => {
              methods.setError(name, {
                type: error.type,
                message: error.message
              });
            });
          } else {
            methods.clearErrors();
          }
        }, 0);

        return () => clearTimeout(timer);
      }, [args.errors, methods]);

       useEffect(() => {
        if (args.values) {
          Object.entries(args.values).forEach(([name, value]) => {
            methods.setValue(name as any, value);
          });
        }}, [args.values, methods])

      return (
        <FormProvider {...methods}>
            <div style={{
              width: 'clamp(200px, 58.2vw, 836px)',
              justifySelf: 'center',
              border: '1px dotted #a3a3a3',
              fontFamily: 'BetterVCR, monospace'
            }}>
              <Story args={{ 
            ...args, 
            onSubmit: methods.handleSubmit(() =>
              alert('Форма отправлена')
            ) 
          }} />
            </div>
        </FormProvider>
      )
    }
  ]
};

export default meta;

type Story = StoryObj<typeof ProfileFormUI>;

export const ProfileFormNewUser: Story = {
  args: {
    role: 'artist',
    isChecked: false,
    isProfileNew: true
  },
};

export const ProfileFormCurrentUser: Story = {
  args: {
    role: 'artist',
    isChecked: false,
    isProfileNew: false,
    values: { 
      name: 'Иван Иванов', 
      email: 'ivan@yandex.ru',
      phone: '71111111111',
      password: '11111111',
      city: 'Moscow',
      url: 'http://ivanov-ivan.ru'
    }
  },
  render: (args) => {
    const [isOnEdit, setIsOnEdit] = useState(args.isProfileNew);
    return (
      <ProfileFormUI 
        {...args} 
        isOnChange={isOnEdit} 
        onEdit={() => setIsOnEdit(true)}
      />
    );
  }
};

export const ProfileFormWithErrors: Story = {
  args: {
    role: 'artist',
    isProfileNew: true,
    values: { 
      name: 'И', 
      email: 'ivan@yandex.ru',
      password: '11111111',
      city: 'Moscow',
      url: 'http://ivanov-ivan.ru'
    },
    errors: {
      phone: {
        type: 'required', 
        message: 'Поле обязательно для заполнения'
      },
      name: {
        type: 'required', 
        message: 'Длина меньше допустимой'
      },
    } 
  },
};

export const ProfileFormWithoutErrors: Story = {
  args: {
    role: 'artist',
    isChecked: true,
    isProfileNew: true,
    isOnChange: false,
    values: { 
      name: 'Иван Иванов', 
      email: 'ivan@yandex.ru',
      phone: '71111111111',
      password: '11111111',
      city: 'Moscow',
      url: 'http://ivanov-ivan.ru'
    },
    onSubmit: () => {alert('njbcjksdf')}
  },
};

