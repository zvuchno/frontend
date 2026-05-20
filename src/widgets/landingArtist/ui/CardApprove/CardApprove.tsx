import type { CardApproveProps } from './CardApprove.types';
import styles from './CardApprove.module.scss';
import clsx from 'clsx';
import { Accordion } from '@/shared/ui/accordion/Accordion';

export const CardApprove: React.FC<CardApproveProps> = ({ 
  mainBlock,
  content,
  className,
  contentClassName
}: CardApproveProps) => {
  return (
    <div
      className={clsx(styles.container, className)}
    >
      <div>{mainBlock}</div>
      <Accordion 
        content={content}
        wrapperClassName={contentClassName}
      />   
    </div>
  )
}