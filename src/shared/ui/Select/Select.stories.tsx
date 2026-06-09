import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SelectUI } from './Select';
import styles from './Select.stories.module.scss';

const meta: Meta<typeof SelectUI> = {
    title: 'shared/ui/Select',
    component: SelectUI,
    args: {
      options: [{
        value: '1',
        label: 'Рок'
      },
      {
        value: '2',
        label: 'Поп'
      },
      {
        value: '3',
        label: 'Реп'
      },
      {
        value: '4',
        label: 'Джаз'
      }
    ],
    value: '',
    onChange: (value: string) => console.log('Selected:', value),
    label: 'Жанр',
    name:'default-select',
    disabled: false,
    required: true,
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInteractive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const handleChange = (value: string) => {
      setValue(value);
    }
    return (
      <SelectUI
        {...args} 
        value={value}
        onChange={handleChange}
      />
    );
  },
};

export const WithSelectedValue: Story = {
  args: {
    value: '1',
  }
};

export const Disabled: Story = {
  args: {
    value: '1',
    label: 'Доп. жанр',
    disabled: true,
  }
};

export const WithClassName1: Story = {
  args: {
    options: [
      {value:'1', label:'Мерч'},
      {value:'2', label:'Альбом'},
    ],
    value: '1',
    label: 'Категория',
    containerClassName: styles.width136,
    selectClassName: styles.borderRadius36,
    labelClassName: styles.fontSize16_ls1,
    optionClassName: styles.itemOnLoadingMerch,
  }
};

export const WithClassName2Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const handleChange = (value: string) => {
      setValue(value);
    }
    return (
      <SelectUI
      {...args}
      value={value}
      onChange={handleChange}
      options={[     
        {value:'1', label:'альбом 1'},
        {value:'2', label:'альбом 2'},
        {value:'3', label:'альбом 3'},
      ]}
      label={'Альбом'}
      placeholder={'выбрать альбом'}
      containerClassName={styles.containerOnPersonalAccountPage}
      selectClassName={styles.selectOnPersonalAccountPage}
      contentClassName={styles.itemListOnPersonalAccountPage}
      optionClassName={styles.itemOnPersonalAccountPage}
    />)
  }
};
