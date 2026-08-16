export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const getErrorMessage = (data: unknown, fallback: string): string => {
  if (!isRecord(data)) return fallback;

  for (const key of ["message", "detail", "phone", "email", "token", "uid"]) {
    const value = data[key];

    if (typeof value === "string" && value) {
      return value;
    }
  }

  return fallback;
};
