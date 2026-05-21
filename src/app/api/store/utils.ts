import { NextResponse } from "next/server";

function getStoreApiBaseUrl(): string {
  const apiBaseUrl =
    process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!apiBaseUrl) {
    throw new Error("Store API base URL is not configured");
  }

  return apiBaseUrl.replace(/\/$/, "");
}

export function buildStoreApiUrl(path: string): string {
  return `${getStoreApiBaseUrl()}${path}`;
}

export function buildStoreApiUrlWithSearch(
  path: string,
  searchParams: URLSearchParams,
): string {
  const query = searchParams.toString();

  return `${buildStoreApiUrl(path)}${query ? `?${query}` : ""}`;
}

export function getAuthorizationHeader(
  request: Request,
): string | NextResponse {
  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader) {
    return NextResponse.json(
      { detail: "Authorization header is required" },
      { status: 401 },
    );
  }

  return authorizationHeader;
}

export async function toProxyResponse(
  response: Response,
): Promise<NextResponse> {
  const headers = new Headers();
  const contentType = response.headers.get("content-type");
  const responseBody = await response.text();

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  return new NextResponse(responseBody, {
    status: response.status,
    headers,
  });
}

export function getAllowedStoreTargetPath(targetUrl: string): string | null {
  try {
    const apiBaseUrl = getStoreApiBaseUrl();
    const originUrl = new URL(apiBaseUrl);
    const target = new URL(targetUrl, originUrl.origin);
    const path = target.pathname.replace(/^\/api(?=\/v1\/)/, "");

    if (/^\/v1\/store\/(albums|tracks|merch)\/\d+\/?$/.test(path)) {
      return path.endsWith("/") ? path : `${path}/`;
    }
  } catch {
    return null;
  }

  return null;
}
