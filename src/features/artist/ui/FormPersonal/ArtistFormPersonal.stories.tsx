import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArtistFormPersonal } from './ArtistFormPersonal';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FieldValues } from './types';
import { taxSystem } from './utils/constants';

const meta: Meta<typeof ArtistFormPersonal> = {
  title: 'features/ArtistFormPersonal',
  component: ArtistFormPersonal,
  parameters: {
    layout: 'centered',
    
  },
  decorators: [
    (Story, { args }) => {
      const methods = useForm<FieldValues>({
        mode: 'onChange',
        defaultValues: { 
          firstName: 'Иван', 
          lastName: 'Иванов',
          middleName: 'Иванович',
          birthDate: new Date('1999-05-07'),
          adress: 'Москва, Кутузовский пр-т., д. 3, кв. 418',
          passport: {
            series: '1234',
            number: '123456',
            issuerCode: '111-111',
            issueDate: new Date('2013-07-25')
          },
          paymentDetails: {
            taxId: '1111111111',
            bic: '123456789',
            correspondentAccount: '00000000000000000000',
            bankName: 'Банк всея Руси',
            account: '12345678901234567890',
            taxSystem: taxSystem[0]
          }
          
        },
      });

      useEffect(() => {
        if (args.values) {
          Object.entries(args.values).forEach(([name, value]) => {
            methods.setValue(name as any, value);
          });
          if(args.isOnChange === true) methods.trigger();
        }}, [args.values, methods])

      return (
        <FormProvider {...methods}>
            <div style={{
              width: 'clamp(280px, 58.2vw, 836px)',
              justifySelf: 'center',
              border: '1px dotted #a3a3a3',
              fontFamily: 'BetterVCR, monospace',
              backgroundColor: '#ffffff'
            }}>
              <Story args={{ 
            ...args
          }} />
            </div>
        </FormProvider>
      )
    }
  ]
};

export default meta;

type Story = StoryObj<typeof ArtistFormPersonal>;

export const ArtistFormPersonalNew: Story = {
  args: {
    values: {
      firstName: '', 
      lastName: '',
      middleName: '',
      birthDate: null,
      adress: '',
      passport: {
        series: '',
        number: '',
        issuerCode: '',
        issueDate: null
      },
      paymentDetails: {
        taxId: '',
        bic: '',
        correspondentAccount: '',
        bankName: '',
        account: '',
        taxSystem: ''
      }
    }
  },
};

export const ArtistFormPersonalCurrent: Story = {
  args: {
    isOnChange: false
  },
  render: (args) => {
    const [isEditMode, setIsEditMode] = useState(args.isOnChange);
    const handleChange = () => {setIsEditMode(true)};
  
    return (
      <ArtistFormPersonal 
        {...args}
        isOnChange={isEditMode}
        onEdit={handleChange}
      />
    );
  }
};

export const ArtistFormPersonalWithErrors: Story = {
  args: {
    isOnChange: true,
    values: { 
      firstName: 'И',
      birthDate: null,
      adress: 'М',
      passport: {
        series: 'bkjb',
        issuerCode: '111-11',
      },
      paymentDetails: {
        bic: '09585',
        correspondentAccount: '0000'
      }
    },
  },
};

export const ArtistFormPersonalWithoutErrors: Story = {
  args: {
    isChecked: true,
    onSubmit: (data) => {
    console.log(data), alert('Форма отправлена')}
  },
};

