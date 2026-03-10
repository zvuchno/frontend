import clsx from 'clsx';
import type { AccordeonCardUIProps } from './AccordeonCard.types';
import styles from './AccordeonCard.module.scss';

const defaultAccordeonTrigger: React.ReactNode = (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="#100F0D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

export const AccordeonCardUI: React.FC<AccordeonCardUIProps> = ({
  label,
  trigger = defaultAccordeonTrigger,
  children,
  containerClassName,
  labelClassName,
  triggerClassName,
  contentClassName,
  isOpen,
  onClick,
}: AccordeonCardUIProps) => {

  return (
    <div
      className={clsx(styles.accordeon__container, containerClassName)}
      
    >
      <div className={styles.accordeon__wrapper} onClick={onClick} >
        <div className={clsx(styles.accordeon__label, labelClassName)}>{label}</div>
        <div className={clsx(styles.accordeon__trigger, { [styles.accordeon__trigger_rotated]: isOpen }, triggerClassName)}>
          {trigger}
        </div>
      </div>
      {isOpen && (
        <div
          className={clsx(styles.accordeon__content, contentClassName)}
        >
          {children}
        </div>
      )}
    </div>
  );
};
