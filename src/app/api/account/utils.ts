import { NextResponse } from "next/server";

function getAccountApiBaseUrl(): string {
  const apiBaseUrl = process.env.BASE_API_URL;

  if (!apiBaseUrl) {
    throw new Error("BASE_API_URL is not configured");
  }

  return apiBaseUrl.replace(/\/$/, "");
}

export function buildAccountApiUrl(path: string): string {
  return `${getAccountApiBaseUrl()}${path}`;
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
