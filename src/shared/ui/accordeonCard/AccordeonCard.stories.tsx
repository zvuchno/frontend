import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AccordeonCardUI } from './AccordeonCard';
import styles from './AccordeonCard.stories.module.scss';

const meta: Meta<typeof AccordeonCardUI> = {
    title: 'shared/ui/AccordeonCard',
    component: AccordeonCardUI,
    args: {
      label: (<p>Когда запуск?</p>),
      children: (<p>Дай Бог в конце лета</p>),
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInteractive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleClick = () => {
      setIsOpen(!isOpen);
    }
    return (
      <AccordeonCardUI
        {...args} 
        isOpen={isOpen}
        onClick={handleClick}
      />
    );
  },
};

export const OpenedAccordeonCard: Story = {
  args: {
    isOpen: true
  }
};

const AccordeonOrderTrigger: React.ReactNode = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3744_18606)">
      <circle cx="14" cy="14" r="13.3" transform="rotate(90 14 14)" stroke="#100F0D" stroke-width="1.4"/>
      <path d="M19.5996 11.5391L13.6599 17.4788L7.72022 11.5391" stroke="#100F0D" stroke-width="1.4" stroke-linecap="round"/>
    </g>
    <defs>
      <clipPath id="clip0_3744_18606">
        <rect width="28" height="28" fill="white" transform="matrix(0 1 -1 0 28 0)"/>
      </clipPath>
    </defs>
  </svg>
)

const dot: React.ReactNode = (
  <svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1.5" cy="1.5" r="1.5" fill="#100F0D"/>
  </svg>
)

const AccordeonOrderLabel: React.ReactNode = (
  <>
    <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <p>Заказ № 35783 -95</p>
      <div style={{display: 'flex', flexDirection: 'row', fontSize: '14px', alignItems: 'center', gap: '5px'}}>
          <p>Статус</p>
          {dot}
          <span style={{color: '#A2A2A2'}}>Доставлен</span>
      </div>
    </div>
    <span>1 500 P</span>
    <span>01.04.2025</span>
  </>
)

const AccordeonOrderContent: React.ReactNode = (
  <>
    <div style={{display: 'flex', flexDirection: 'row', fontSize: '14px', lineHeight: '16px', alignItems: 'center', gap: '5px'}}>
      <span>Адрес</span>
      {dot}
      <span style={{color: '#A2A2A2'}}>Россия, г. Москва, ул. Советская, д.93</span>
    </div>
    <div style={{display: 'flex', flexDirection: 'row', fontSize: '14px', alignItems: 'center', gap: '5px'}}>
      <span>Способ доставки</span>
      {dot}
      <span style={{color: '#A2A2A2'}}>Яндекс-доставка</span>
    </div>
    <div style={{display: 'flex', flexDirection: 'row', fontSize: '14px', alignItems: 'center', gap: '5px'}}>
      <span>ФИО получателя</span>
      {dot}
      <span style={{color: '#A2A2A2'}}>Константинов Константин Константинович</span>
    </div>
     </>
)

export const WithClassNamesForOrder: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleClick = () => {
      setIsOpen(!isOpen);
    }
    return (
      <AccordeonCardUI
        {...args} 
        isOpen={isOpen}
        onClick={handleClick}
        label={AccordeonOrderLabel}
        trigger={AccordeonOrderTrigger}
        containerClassName={ styles.accordeon__container_order}
        labelClassName={styles.accordeon__label_order}
        triggerClassName={styles.accordeon__trigger_order}
        contentClassName={styles.accordeon__content_order}
      >
        {AccordeonOrderContent}
      </AccordeonCardUI>
    );
  },
};
