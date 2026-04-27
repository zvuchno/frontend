import { NextResponse } from "next/server";

const LISTENER_ME_PATH = "/v1/listener/me/";

function getListenerApiBaseUrl(): string {
  const apiBaseUrl = process.env.BASE_API_URL;

  if (!apiBaseUrl) {
    throw new Error("BASE_API_URL is not configured");
  }

  return apiBaseUrl.replace(/\/$/, "");
}

function buildListenerApiUrl(path: string): string {
  return `${getListenerApiBaseUrl()}${path}`;
}

function getAuthorizationHeader(request: Request): string | NextResponse {
  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader) {
    return NextResponse.json(
      { detail: "Authorization header is required" },
      { status: 401 },
    );
  }

  return authorizationHeader;
}

async function toProxyResponse(response: Response): Promise<NextResponse> {
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

export async function GET(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const response = await fetch(buildListenerApiUrl(LISTENER_ME_PATH), {
      method: "GET",
      headers: {
        Authorization: authorizationHeader,
      },
      cache: "no-store",
    });

    return toProxyResponse(response);
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "Failed to proxy listener request",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const payload = await request.json();
    const response = await fetch(buildListenerApiUrl(LISTENER_ME_PATH), {
      method: "PATCH",
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return toProxyResponse(response);
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "Failed to proxy listener update request",
      },
      { status: 500 },
    );
  }
}
