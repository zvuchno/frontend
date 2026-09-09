import "server-only";

import { getErrorMessage } from "../errors/getErrorMessage";
import { ApiError } from "../errors/apiError";

export async function publicFetchServer<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T | null> {
  const response = await fetch(input, init);

  if (response.status === 204 || response.status === 205) return null;

  const contentType = response.headers.get("content-type") ?? "";
  const data: unknown = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = getErrorMessage(data, `HTTP ${response.status} ${response.statusText}`);
    
    if (Array.isArray(message)) {
      throw new ApiError(message[0], message.slice(1));
    }

    throw new Error(message);
  }

  return data as T;
}
