import clsx from 'clsx';
import { useState } from 'react';
import type { CardFAQUIProps } from './CardFAQ.types';
import styles from './CardFAQ.module.scss';

const defaultAccordeonTrigger: React.ReactNode = (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="#100F0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const CardFAQUI: React.FC<CardFAQUIProps> = ({
  label,
  trigger = defaultAccordeonTrigger,
  children,
  containerClassName,
  labelClassName,
  triggerClassName,
  contentClassName,
}: CardFAQUIProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className={clsx(styles.cardFAQ__container, containerClassName)}
      
    >
      <div className={styles.cardFAQ__wrapper} onClick={() => setIsOpen(!isOpen)} >
        <div className={clsx(styles.cardFAQ__label, labelClassName)}>{label}</div>
        <div className={clsx(styles.cardFAQ__trigger, { [styles.cardFAQ__trigger_rotated]: isOpen }, triggerClassName)}>
          {trigger}
        </div>
      </div>
      {isOpen && (
        <div
          className={clsx(styles.cardFAQ__content, contentClassName)}
        >
          {children}
        </div>
      )}
    </div>
  );
};
