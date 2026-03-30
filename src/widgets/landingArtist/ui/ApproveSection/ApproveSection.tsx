import type { ApproveSectionProps } from './ApproveSection.types';
import styles from './ApproveSection.module.scss';
import clsx from 'clsx';
import { Title } from '@/shared/ui/Typography/Typography';
import { Accordion } from '../../../../shared/ui/accordion/Accordion';

export const ApproveSection: React.FC<ApproveSectionProps> = ({ className, artistInfo }: ApproveSectionProps) => {
    return (
        <div className={clsx(styles.container, className)}>
            <Title Tag='h2'className={styles.title}>одобрено музыкантами</Title>
            <div className={styles.wrapper}>
              {artistInfo.map((artist) => { 
                return (
                <Accordion 
                  key={crypto.randomUUID()}
                  content={artist.content}
                  artistCardInfo={{image: artist.image, description: artist.description}} /> 
              )
              })}
            </div>
        </div>
    )
}