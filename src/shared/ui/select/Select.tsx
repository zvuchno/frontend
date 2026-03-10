'use client';
import clsx from 'clsx';
import type {CustomSelectUIProps} from './Select.types';
import styles from './Select.module.scss';
import * as Select from '@radix-ui/react-select';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const ShevronIcon = () => (
  <svg 
    width="100%" height="100%" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="1"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const CustomSelectUI = ({
  options,
  value,
  onChange,
  label,
  name,
  placeholder = 'Выберите...',
  disabled,
  required,
  containerClassName,
  selectClassName,
  iconClassName,
  labelClassName,
  itemListClassName,
  itemClassName,
  itemTextClassName,
}: CustomSelectUIProps) => {
  
  return (
    <div className={clsx(styles.customSelect__container, containerClassName)}>
      {label && <label className={clsx(styles.customSelect__label, labelClassName)}>{label}</label>}

      <Select.Root value={value} onValueChange={onChange} disabled={disabled} required={required} name={name}>
        <Select.Trigger 
          className={clsx(styles.customSelect__trigger, selectClassName)}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className={clsx(styles.customSelect__icon, iconClassName)}>
            <ShevronIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={clsx(styles.customSelect__content, itemListClassName)} position="popper" sideOffset={4}>
            <ScrollArea.Root className={styles.scrollArea__root} type="auto">
              <Select.Viewport asChild>
                <ScrollArea.Viewport className={styles.scrollArea__viewport}>
                  {options.map((opt) => (
                    <Select.Item key={opt.value} value={opt.value} className={clsx(styles.customSelect__item, itemClassName)}>
                      <Select.ItemText className={clsx(styles.customSelect__itemText, itemTextClassName)}>{opt.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </ScrollArea.Viewport>
              </Select.Viewport>

              <ScrollArea.Scrollbar 
                className={styles.scrollArea__scrollbar} 
                orientation="vertical"
              >
                <ScrollArea.Thumb className={styles.scrollArea__thumb} />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
