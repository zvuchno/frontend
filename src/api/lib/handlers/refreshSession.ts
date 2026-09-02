let refreshPromise: Promise<boolean> | null = null;

// route handler для Next-приложения для вызова через него refreshUserServerCookie
export function refreshSession(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "same-origin",
  })
    .then((response) => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
