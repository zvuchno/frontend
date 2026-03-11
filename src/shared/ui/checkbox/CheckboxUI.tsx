import { ChangeEvent, FC } from 'react'
import styles from './checkbox.module.scss'
import { TCheckboxUIProps } from './types'
import clsx from 'clsx'
import { CheckBoxIcon } from '../icons/checkBoxIcon'
import { RadioButtonIcon } from '../icons/radioButtonIcon'

export const CheckboxUI:FC<TCheckboxUIProps> = ({
  type = 'checkbox',
  children,
  isChecked = false,
  disabled = false,
  onChange,
  name,
  value
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };
  return (
    <label className={clsx(
      styles.checkbox,
      {[styles.radioButton]: type === 'radio'},
      { [styles.noChecked]: type === 'radio' && !isChecked },
      { [styles.disabled]: disabled }
    )}>
      <input
        type={type}
        className={styles.hiddenInput}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        value={value}
        aria-hidden="true"
      />
      <span className={styles.checkboxWrapper} aria-hidden="true">
        <span 
          className={styles.checkboxArea}
          role={ type === 'checkbox' ? 'checkbox' : 'radio'}
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-label={type}
        >
          {type === 'checkbox' && 
            <CheckBoxIcon isChecked={isChecked}/>
          }
          {type === 'radio' && 
            <RadioButtonIcon isSelected={isChecked}/>
          }
        </span>
      </span>
      <span className={styles.checkboxLabel}>
        <p>{children}</p>
      </span>
    </label>
  )
}