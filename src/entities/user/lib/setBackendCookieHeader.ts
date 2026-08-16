export const setBackendCookieHeader = (
  backendCookies: Map<string, string>,
  backendHeaders: Headers
): void => {
  const cookieHeader = [...backendCookies].map(([name, value]) => `${name}=${value}`).join("; ");

  if (cookieHeader) {
    backendHeaders.set("cookie", cookieHeader);
  } else {
    backendHeaders.delete("cookie");
  }
};
