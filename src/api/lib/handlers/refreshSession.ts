// route handler для Next-приложения для вызова через него refreshUserServerCookie
export async function refreshSession(): Promise<boolean> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "same-origin",
  });

  return response.ok;
}
