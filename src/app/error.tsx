"use client";

import { ButtonUI } from '@/shared/ui';
import s from './error.module.scss';

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={s.errorContainer}>
      <h2 className={s.errorContainer__title}>Произошла ошибка!</h2>
      <p className={s.errorContainer__text}>{error.message}</p>
      <ButtonUI className={s.errorContainer__button} variant='primary' onClick={() => reset()}>Попробовать снова</ButtonUI>
    </div>
  );
}