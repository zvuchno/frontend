export const normalizePrice = (val: number): string => {
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
};