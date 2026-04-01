import type { ApproveSectionProps } from './ApproveSection.types';
import styles from './ApproveSection.module.scss';
import clsx from 'clsx';
import { Accordion } from '@/shared/ui/accordion/Accordion';

export const ApproveSection: React.FC<ApproveSectionProps> = ({ 
  mainBlock,
  content,
  className,
  contentClassName
}: ApproveSectionProps) => {
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