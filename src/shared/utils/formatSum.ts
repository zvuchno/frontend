export const formatSum = (value: string | number): string => {
  const num = typeof value === "string" ? Number(value) : value;

  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })
    .format(num)
    .replace(",", ".");
};
