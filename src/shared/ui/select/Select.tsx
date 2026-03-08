import React, {  useId, useState } from 'react';
import clsx from 'clsx';
import type {BaseSelectUIProps} from './Select.types';
import styles from './Select.module.scss';

const ShevronIcon = () => (
  <svg 
    width="100%" height="100%" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="1"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const selectIconDefault = <ShevronIcon />;

export const SelectUI: React.FC<BaseSelectUIProps> = ({ 
  children,     
  value, 
  onChange, 
  icon = selectIconDefault,
  label,
  name,
  id,
  placeholder,
  required = false,
  disabled = false,
  containerClassName,
  selectClassName,
  iconClassName,
  labelClassName, 
}) => {
  
  const [isFocused, setIsFocused] = useState(false);
  const generatedId = useId();
  const selectId = id || generatedId;
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };
  
  return (
    <div className={clsx(styles.baseSelect__container, containerClassName)}>
      {!!label && <label htmlFor={id} className={clsx(styles.baseSelect__label, labelClassName)}>{label}</label>}
      <div className={styles.baseSelect__wrapper}>
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        onClick={() => setIsFocused(!isFocused)}
        disabled={disabled}
        required={required}
        name={name ?? ''}
        className={clsx(styles.baseSelect__select, selectClassName)}
      >
      {!!placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
        {children}
      </select>
      <div className={clsx(styles.baseSelect__icon, iconClassName, {[styles.baseSelect__icon_rotated]: isFocused})}> 
        {icon}
      </div>
      </div>
    </div>
  );
}