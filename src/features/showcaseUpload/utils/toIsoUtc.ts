export const toIsoUtc = (localString: string | undefined) => {
  if (!localString) return null;
  const normalized = localString.slice(0, 16); // убираем секунды, если Safari их добавил
  // localString — это YYYY-MM-DDThh:mm из input type="datetime-local"
  const date = new Date(normalized); // интерпретируется как локальное время
  if (isNaN(date.getTime())) return null;
  return date.toISOString(); // "2026-08-06T00:00:00.000Z" (UTC)
};