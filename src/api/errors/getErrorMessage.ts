export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const getErrorMessage = (data: unknown, fallback: string): string => {
  if (!isRecord(data)) return fallback;

  for (const key of [
    "message", 
    "detail", 
    "phone", 
    "email", 
    "token", 
    "uid", 
    "is_published",
    "price",
  ]) {
    const value = data[key];

    if (typeof value === "string" && value) {
      return value;
    }

    if (Array.isArray(value) && value.length > 0) {
      const firstItem = value[0];
      if (typeof firstItem === 'string' && firstItem) {
        return firstItem;
      }
    }
  }

  return fallback;
};
