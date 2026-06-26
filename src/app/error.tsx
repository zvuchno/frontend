"use client";

import { ButtonUI } from '@/shared/ui';
import s from './error.module.scss';

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className={s.errorContainer}>
      <h2 className={s.errorContainer__title}>Произошла ошибка</h2>
      <p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>
      <ButtonUI variant='primary' onClick={() => reset()}>Попробовать снова</ButtonUI>
    </div>
  );
}