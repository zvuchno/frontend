export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const collectMessages = (value: unknown, allMessages: string[]): void => {
  if (typeof value === "string") {
    allMessages.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectMessages(item, allMessages));
  } else if (isRecord(value)) {
    for (const key in value) {
      collectMessages(value[key], allMessages);
    }
  }
};

export const getErrorMessage = (data: unknown, fallback: string): string | string[] => {
  const allMessages: string[] = [];

  collectMessages(data, allMessages);

  const serverMessage = allMessages.join("\n");

  console.log(serverMessage);
  return serverMessage.length > 0 ? serverMessage : fallback;
};
