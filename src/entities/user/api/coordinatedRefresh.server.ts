import "server-only";

import { refreshUserServerCookie } from "./api.serverCookie";

type RefreshResult = {
  ok: boolean;
  setCookies: string[];
};

const REFRESH_RESULT_TTL_MS = 2_000;

const globalForRefresh = globalThis as typeof globalThis & {
  zvuchnoRefreshRequests?: Map<string, Promise<RefreshResult>>;
};

const refreshRequests: Map<string, Promise<RefreshResult>> =
  globalForRefresh.zvuchnoRefreshRequests ?? new Map<string, Promise<RefreshResult>>();

globalForRefresh.zvuchnoRefreshRequests = refreshRequests;

export function coordinatedRefresh(
  cookieName: string,
  refreshToken: string
): Promise<RefreshResult> {
  const existing = refreshRequests.get(refreshToken);

  if (existing) return existing;

  const promise = refreshUserServerCookie(cookieName, refreshToken)
    .then((response) => ({
      ok: response.ok,
      setCookies: response.headers.getSetCookie(),
    }))
    .catch(() => ({
      ok: false,
      setCookies: [],
    }));

  refreshRequests.set(refreshToken, promise);

  void promise.finally(() => {
    setTimeout(() => {
      if (refreshRequests.get(refreshToken) === promise) {
        refreshRequests.delete(refreshToken);
      }
    }, REFRESH_RESULT_TTL_MS);
  });

  return promise;
}
