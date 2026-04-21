import { NextResponse } from "next/server";

import {
  buildArtistApiUrl,
  getAuthorizationHeader,
  toProxyResponse,
} from "../../utils";

const CURRENT_ARTIST_COVER_PATH = "/v1/artists/me/cover/";

export async function PATCH(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const formData = await request.formData();
    const response = await fetch(buildArtistApiUrl(CURRENT_ARTIST_COVER_PATH), {
      method: "PATCH",
      headers: {
        Authorization: authorizationHeader,
      },
      body: formData,
      cache: "no-store",
    });

    return toProxyResponse(response);
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error
            ? error.message
            : "Failed to proxy current artist cover update request",
      },
      { status: 500 },
    );
  }
}
