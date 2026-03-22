// 'use client';
import React, { useState, useId } from 'react';
import clsx from 'clsx';
import type { SelectUIProps } from './Select.types';
import styles from './Select.module.scss';



const defaultSelectIcon: React.ReactNode =  (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L10 13L17 6" stroke="#100F0D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SelectUI = ({
  options,
  value,
  onChange,
  label,
  icon = defaultSelectIcon, 
  name,
  placeholder = 'Выберите...',
  disabled,
  required,
  containerClassName,
  selectClassName,
  iconClassName,
  labelClassName,
  contentClassName,
  optionClassName,
}: SelectUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  const handleOptionClick = (val: string) => {
    if (disabled) return;
    onChange(val); 
    setIsOpen(false);
  };

  return (
    <div 
      className={clsx(styles.select__container, containerClassName)} 
    >
      {!!label && (
        <label className={clsx(styles.select__label, labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.select__wrapper}>
        {/* Нативный селект визуально скрыт от пользователя, но работает для форм */}
        <select
          id={id}
          value={value}
          name={name}
          required={required}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={styles.select__select_visuallyHidden}
        ></select>

        {/* Tо, что видит пользователь вместо нативного селекта */}
        <div
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={clsx(
            styles.select__select, 
            selectClassName, 
            { [styles.select__select_disabled]: disabled }
          )}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
        >
          <span className={clsx({[styles.select__select_placeholder]: !selectedLabel})}>
            {selectedLabel ?? placeholder}
          </span>
          <div className={clsx(styles.select__icon, iconClassName, { [styles.select__icon_rotated]: isOpen })}>
            {icon}
          </div>
        </div>

        {isOpen && !disabled && (
          <div className={clsx(styles.select__content, contentClassName)}>
            <ul role="listbox" className={styles.select__list}>
              {options.map((opt) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={value === opt.value}
                  className={clsx(
                    styles.select__option, optionClassName,
                    { [styles.select__option_selected]: value === opt.value }
                  )}
                  onClick={() => handleOptionClick(opt.value)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};