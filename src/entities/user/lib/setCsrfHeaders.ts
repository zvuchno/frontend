import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const frontendOrigin = process.env.FRONTEND_ORIGIN || "https://dev.zvuchno.space";

export const setCsrfHeaders = (
  cookieStore: ReadonlyRequestCookies,
  backendHeaders: Headers
): void => {
  const csrfToken = cookieStore.get("csrftoken")?.value;

  if (csrfToken) {
    backendHeaders.set("x-csrftoken", csrfToken);
  }

  if (!frontendOrigin) {
    throw new Error("FRONTEND_ORIGIN is not configured");
  }

  backendHeaders.set("origin", frontendOrigin);
  backendHeaders.set("referer", `${frontendOrigin}/`);
};
