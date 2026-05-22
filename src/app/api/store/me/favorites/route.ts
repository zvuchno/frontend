import { NextResponse } from "next/server";

import {
  buildStoreApiUrlWithSearch,
  getAuthorizationHeader,
  toProxyResponse,
} from "../../utils";

const FAVORITES_PATH = "/v1/store/me/favorites/";

export async function GET(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const { searchParams } = new URL(request.url);
    const response = await fetch(
      buildStoreApiUrlWithSearch(FAVORITES_PATH, searchParams),
      {
        method: "GET",
        headers: {
          Authorization: authorizationHeader,
        },
        cache: "no-store",
      },
    );

    return toProxyResponse(response);
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "Failed to proxy favorites request",
      },
      { status: 500 },
    );
  }
}
