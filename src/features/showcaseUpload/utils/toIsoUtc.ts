export const toIsoUtc = (localString: string | undefined) => {
  if (!localString) return null;
  // localString — это YYYY-MM-DDThh:mm из input type="datetime-local"
  const date = new Date(localString); // интерпретируется как локальное время
  return date.toISOString(); // "2026-08-06T00:00:00.000Z" (UTC)
};