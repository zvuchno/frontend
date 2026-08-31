'use client';

import React, { useState, useId, ChangeEvent, forwardRef } from 'react';
import clsx from 'clsx';
import type { SelectUIProps } from './Select.types';
import styles from './Select.module.scss';
import { useClickOutside } from '@/shared/hooks/useClickOutside';



const defaultSelectIcon: React.ReactNode =  (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L10 13L17 6" stroke="#100F0D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SelectUI = forwardRef<HTMLSelectElement, SelectUIProps> (
  ({
    options,
    label,
    icon = defaultSelectIcon,
    placeholder = 'Выберите...',
    disabled,
    required,
    containerClassName,
    selectClassName,
    iconClassName,
    labelClassName,
    contentClassName,
    optionClassName,
    name,
    value,
    onChange,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();

    //const selectedLabel = options.find((opt) => opt.value === value)?.label;
    const selectedLabel = options
      .flatMap((opt) => ('options' in opt ? opt.options : [opt]))
      .find((opt) => opt.value === value)?.label;

    const closeOnOutsideClick = () => setIsOpen(false);
    const selectRef = useClickOutside(closeOnOutsideClick);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleOptionClick = (val: string) => {
      if (disabled) return;
      if (onChange) {
        onChange(val)
      }
      setIsOpen(false);
    };

    return (
      <div 
        className={clsx(styles.select__container, containerClassName)} 
        ref={selectRef}
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
            ref={ref}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={disabled}
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
            tabIndex={disabled ? undefined : 0}
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
                {options.map((item, groupIdx) => 
                  'options' in item ? (
                    // Группа
                    <React.Fragment key={groupIdx}>
                      <li className={styles.select__groupHeader} aria-hidden="true">
                        {item.label}
                      </li>
                      {item.options.map((opt) => (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={value === opt.value}
                          className={clsx(
                            styles.select__option,
                            optionClassName,
                            { [styles.select__option_selected]: value === opt.value }
                          )}
                          onClick={() => handleOptionClick(opt.value)}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </React.Fragment>
                  ) : (
                    // Одиночный пункт
                    <li
                      key={item.value}
                      role="option"
                      aria-selected={value === item.value}
                      className={clsx(
                        styles.select__option,
                        optionClassName,
                        { [styles.select__option_selected]: value === item.value }
                      )}
                      onClick={() => handleOptionClick(item.value)}
                    >
                      {item.label}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
);

SelectUI.displayName = 'Select';