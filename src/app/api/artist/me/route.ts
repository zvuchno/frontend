import { NextResponse } from "next/server";

import {
  buildArtistApiUrl,
  getAuthorizationHeader,
  toProxyResponse,
} from "../utils";

const CURRENT_ARTIST_PATH = "/v1/artists/me/";

export async function GET(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const response = await fetch(buildArtistApiUrl(CURRENT_ARTIST_PATH), {
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
            : "Failed to proxy current artist request",
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
    const response = await fetch(buildArtistApiUrl(CURRENT_ARTIST_PATH), {
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
            : "Failed to proxy current artist update request",
      },
      { status: 500 },
    );
  }
}
