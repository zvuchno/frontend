import type { HeroUIProps } from './Hero.types';
import { Title } from '@/shared/ui/Typography/Typography';
import clsx from 'clsx';
import styles from './Hero.module.scss';

export const HeroUI: React.FC<HeroUIProps> = (
) => {
  return (
    <div className={styles.hero__container}>
        <Title Tag='h4' variant='title' className={clsx(styles.hero__text, styles.hero__text_left)}>маркетплейс цифровой музыки<br /> от СНГ артистов</Title>
        <Title Tag='h1' variant= 'title' className={styles.hero__h1}>ЗВУЧНО</Title>
        <Title Tag='h4' variant='title' className={clsx(styles.hero__text, styles.hero__text_right)}>место, где нет барьеров между<br /> артистами и слушателями</Title>
    </div>
  )
}

export default HeroUI;