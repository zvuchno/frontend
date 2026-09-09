export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const getErrorMessage = (data: unknown, fallback: string): string | string[] => {
  if (!isRecord(data)) return fallback;

  if ("detail" in data && "reasons" in data) {
    const messages: string[] = [];
    if (typeof data.detail === 'string') messages.push(data.detail);
    if (Array.isArray(data.reasons)) {
      data.reasons.forEach((reason) => {
        messages.push(reason)
      })
    }

    return messages;
  }

  for (const key of [
    "message",
    "detail",
    "phone",
    "email",
    "token",
    "uid",
    "is_published",
    "price",
    "code",
    "old_password",
    "password",
    "new_password",
    "confirm_password",
  ]) {
    const value = data[key];

    if (typeof value === "string" && value) {
      return value;
    }

    if (Array.isArray(value) && value.length > 0) {
      const firstItem = value[0] as unknown;
      if (typeof firstItem === "string" && firstItem) {
        return firstItem;
      }
    }
  }

  return fallback;
};
