import { TButtonProps } from "./types";
import styles from './button.module.scss'
import clsx from 'clsx';
import { FC } from "react";

export const Button: FC<TButtonProps> = (
  {
    variant,
    disabled = false,
    children,
    htmlType = 'button',
    isLoading = false,
    size = null,
    styled = false,
    ariaLabel,
    className,
    onFileSelect = false,
    onClick
  }) => (
  <button 
    className={clsx(
      styles.button,
      styles[`${variant}Button`],
      { [styles[`${size}Button`]] : size !== 'standart'},
      { [styles.disabled] : disabled},
      { [styles.isLoading] : isLoading},
      { [styles.onFileSelect] : onFileSelect},
      className
    )}
    type={htmlType}
    disabled={disabled}
    aria-label={typeof children === 'string' ? children : ariaLabel}
    aria-disabled={disabled}
    onClick={onClick}
      >
        <span className={clsx(
          styles.buttonContent,
          { [styles.styled] : styled })}
          >
            {children}
        </span>
  </button>
)