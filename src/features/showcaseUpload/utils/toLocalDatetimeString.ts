export const toLocalDatetimeString = (isoString: string | null): string | null => {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return null;

  // toLocaleDateString + toLocaleTimeString даёт строку без зоны, но в локальном времени.
  // Но для input type="datetime-local" нужен формат YYYY-MM-DDThh:mm
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};