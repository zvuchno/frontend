import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { type NextRequest } from "next/server";

export const setCsrfHeaders = (
  request: NextRequest,
  cookieStore: ReadonlyRequestCookies,
  backendHeaders: Headers
): void => {
  const csrfToken = cookieStore.get("csrftoken")?.value;

  if (csrfToken) {
    backendHeaders.set("x-csrftoken", csrfToken);
  }

  backendHeaders.set("origin", request.nextUrl.origin);
  backendHeaders.set("referer", `${request.nextUrl.origin}/`);
};
