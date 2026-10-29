export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const collectArrayMessages = (
  items: unknown[],
  allMessages: Record<string, string>,
  parentPath: string
): void => {
  for (const item of items) {
    if (typeof item === "string") {
      if (parentPath) {
        allMessages[parentPath] = item;
      }
    } else {
      collectMessages(item, allMessages, parentPath);
    }
  }
};

const collectMessages = (
  value: unknown,
  allMessages: Record<string, string>,
  parentKey = ""
): void => {
  if (Array.isArray(value)) {
    collectArrayMessages(value, allMessages, parentKey);
    return;
  }

  if (isRecord(value)) {
    for (const [key, prop] of Object.entries(value)) {
      const path = parentKey ? `${parentKey}.${key}` : key;

      if (typeof prop === "string") {
        allMessages[path] = prop;
      } else {
        collectMessages(prop, allMessages, path);
      }
    }
  }
};

export const getErrorMessage = (
  data: unknown,
  fallback: string
): Record<string, string> | string => {
  const allMessages: Record<string, string> = {};

  collectMessages(data, allMessages);

  return Object.keys(allMessages).length > 0 ? allMessages : fallback;
};
