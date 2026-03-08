import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
// import { SelectUI } from './Select';
import { CustomSelectUI } from './Select';
import styles from './Select.stories.module.scss';

// const meta: Meta<typeof SelectUI> = {
//     title: 'shared/ui/BaseSelect',
//     component: SelectUI,
//     args: {
//       children: (<>
//         <option value=''>Выберите жанр</option>
//         <option value='1'>Рок</option>
//         <option value='2'>Поп</option>
//         <option value='3'>Реп</option>
//         <option value='4'>Джаз</option>            
//         </>
//       ),
//       value: '',
//       label: 'Жанр',
//       name:'default-select',
//       id:'default-select',
//       disabled: false,
//       required: true,
//     },
//     tags: ['autodocs']
// };

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {

//   }
// };

// export const Interactive: Story = {
//   render: (args) => {
//     const [value, setValue] = useState<string>('');
//     const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//       const newValue = event.target.value;
//       setValue(newValue);
//       args.onChange?.(event); 
//     }
//     return (
//       <SelectUI
//         {...args} 
//         value={value}
//         id='interactive-select'
//         onChange={handleChange}
//       />
//     );
//   },
// };

// export const WithSelectedValue: Story = {
//   args: {
//     value: '1',
//     id: 'with-value-select',
//   }
// };

// export const WithPlaceholder: Story = {
//   args: {
//     value: '',
//     id: 'with-placeholder-select',
//     placeholder: 'Выберите жанр из списка'
//   }
// };

// export const Disabled: Story = {
//   args: {
//     value: '1',
//     id: 'disabled-select',
//     label: 'Доп. жанр',
//     disabled: true,
//   }
// };

// export const WithClassName1: Story = {
//   args: {
//     children: (<>
//             <option value='1'>Мерч</option>
//             <option value='2'>Альбом</option>
//             <option value='3'>Сингл</option>
//             </>),
//     value: '1',
//     containerClassName: styles.width134,
//     selectClassName: styles.borderRadius36,
//     labelClassName: styles.fontSize16,
//     id: 'with-classname-select',
//     label: 'Категория',
//   }
// };

// export const WithClassName2: Story = {
//   args: {
//     children: (<>
//             <option value=''>Выберите тип мерча</option>
//             <option value='1'>Футболка</option>
//             <option value='1'>Виниловый альбом</option>
//             </>),
//     value: '1',
//     containerClassName: styles.width240,
//     selectClassName: styles.selectOnPersonalAccountPage,
//     id: 'with-classname-select',
//     label: 'Тип мерча',
//   }
// };

const meta: Meta<typeof CustomSelectUI> = {
    title: 'shared/ui/CustomSelect',
    component: CustomSelectUI,
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
    label: 'Жанр',
    name:'custom-select',
    disabled: false,
    required: true,
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  }
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const handleChange = (value: string) => {
      setValue(value);
    }
    return (
      <CustomSelectUI
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
    containerClassName: styles.width134,
    selectClassName: styles.borderRadius36,
    labelClassName: styles.fontSize16_ls1,
    itemClassName: styles.itemOnLoadingMerch,
  }
};

export const WithClassName2Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    const handleChange = (value: string) => {
      setValue(value);
    }
    return (
      <CustomSelectUI
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
      itemListClassName={styles.itemListOnPersonalAccountPage}
      itemClassName={styles.itemOnPersonalAccountPage}
    />)
  }
};
