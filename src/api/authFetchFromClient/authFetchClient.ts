import { signOut } from "next-auth/react";

import { getErrorMessage } from "../errors/getErrorMessage";
import { RateLimitError } from "../errors/rateLimitError";
import { logoutFromBackend } from "../lib/handlers/logoutFromBackend";
import { refreshSession } from "../lib/handlers/refreshSession";

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

export const authFetchClient = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T | null> => {
  //первоначальный запрос

  const headers = new Headers(init?.headers);

  if (typeof init?.body === "string" && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  const requestInit: RequestInit = {
    ...init,
    headers,
    credentials: "same-origin",
  };

  let res = await fetch(input, requestInit);

  //const hasFormData = init?.body instanceof FormData;

  /*if (!hasFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }*/

  //const res = await fetch(input, { ...init, headers });

  // проверка срок локальной NextAuth-сессии. Если BFF вернул x-session-expired: 1, не пытаемся обновлять backend access-token -> делаем backend logout, затем NextAuth logout
  if (res.status === 401 && res.headers.get("x-session-expired") === "1") {
    await logoutFromBackend();

    await signOut({
      redirect: true,
      callbackUrl: "/signin",
    });

    throw new Error("Session expired");
  }

  //Обработка 401 через попытку refresh
  if (res.status === 401) {
    const refreshed = await refreshSession();

    //один повторный запрос после refresh
    if (refreshed) {
      res = await fetch(input, requestInit);
    }
    //если refresh не получился -> разлогиниваем пользователя
    if (res.status === 401) {
      await logoutFromBackend();

      await signOut({
        redirect: true,
        callbackUrl: "/signin",
      });

      throw new Error("Unauthorized");
    }
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
