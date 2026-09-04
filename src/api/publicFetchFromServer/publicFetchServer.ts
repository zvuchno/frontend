import "server-only";

import { getErrorMessage } from "../errors/getErrorMessage";

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
    throw new Error(getErrorMessage(data, `HTTP ${response.status} ${response.statusText}`));
  }

  return data as T;
}
