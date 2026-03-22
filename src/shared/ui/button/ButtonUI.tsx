import { TButtonUIProps } from "./types";
import styles from './button.module.scss'
import clsx from 'clsx';
import { FC } from "react";

export const ButtonUI: FC<TButtonUIProps> = (
  {
    variant,
    disabled = false,
    children,
    type = 'button',
    size = 'standart',
    ariaLabel,
    className,
    contentClassName,
    onClick
  }) => (
  <button 
    className={clsx(
      styles.button,
      styles[`${variant}Button`],
      { [styles[`${size}Button`]] : size !== 'standart' },
      className
    )}
    type={type}
    disabled={disabled}
    aria-label={typeof children === 'string' ? children : ariaLabel}
    aria-disabled={disabled}
    onClick={onClick}
      >
        <span className={clsx(
          styles.buttonContent,
          contentClassName
          )}
        >
          {children}
        </span>
  </button>
)