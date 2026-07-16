export function getRelativeDateLabel(dateStr: string | null | undefined): string {
  if (!dateStr) return '';

  const now = new Date();
  const target = new Date(dateStr);

  // Нормализуем до начала дня (чтобы сравнивать даты, а не время)
  const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetStart = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  const diffMs = targetStart.getTime() - nowStart.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Сегодня';
  if (diffDays === -1) return 'Вчера';

  // Для остальных — формат ДД.ММ.ГГГГ
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(target);
};