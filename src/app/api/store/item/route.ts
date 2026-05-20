import { NextResponse } from "next/server";

import {
  buildStoreApiUrl,
  getAllowedStoreTargetPath,
  getAuthorizationHeader,
  toProxyResponse,
} from "../utils";

export async function GET(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get("targetUrl");
    const targetPath = targetUrl ? getAllowedStoreTargetPath(targetUrl) : null;

    if (!targetPath) {
      return NextResponse.json(
        { detail: "Unsupported store target URL" },
        { status: 400 },
      );
    }

    const response = await fetch(buildStoreApiUrl(targetPath), {
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
            : "Failed to proxy store item request",
      },
      { status: 500 },
    );
  }
}
