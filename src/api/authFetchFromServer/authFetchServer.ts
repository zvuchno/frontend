import { cookies } from "next/headers";
import "server-only";

import { getErrorMessage } from "../errors/getErrorMessage";
import { RateLimitError } from "../errors/rateLimitError";

// Парсинг Retry-After: число (секунды) или HTTP-дата
const parseRetryAfter = (header: string | null): number => {
  if (!header) return 3000; // fallback 3 сек
  const num = Number(header);
  if (!Number.isNaN(num)) return num * 1000;
  // HTTP-date: "Mon, 29 Mar 2021 04:58:00 GMT"
  const date = Date.parse(header);
  if (!Number.isNaN(date)) {
    const now = Date.now();
    const diff = date - now;
    return Math.max(0, diff);
  }
  return 3000;
};

export const authFetchServer = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T | null> => {
  const headers = new Headers(init?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .filter((cookie) => cookie.name === "zvuchno_access" || cookie.name === "zvuchno_refresh")
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  if (cookieHeader) {
    headers.set("cookie", cookieHeader);
  }

  const res = await fetch(input, { ...init, headers });

  //Обработка 401
  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  // Обработка 429 — с учётом Retry-After
  if (res.status === 429) {
    const retryAfterMs = parseRetryAfter(res.headers.get("retry-after"));

    // использовать для перезапроса
    // или информирования пользователя о том, что слишком много запросов
    throw new RateLimitError(retryAfterMs);
  }

  if (res.status === 204 || res.status === 205) {
    return null;
  }

  const contentType = res.headers.get("content-type") ?? "";

  const data: unknown = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    throw new Error(getErrorMessage(data, `HTTP ${res.status} ${res.statusText}`));
  }

  return data as T;
};
