import { NextResponse } from "next/server";

import {
  buildStoreApiUrl,
  getAuthorizationHeader,
  toProxyResponse,
} from "../../../utils";

type FavoriteRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, context: FavoriteRouteContext) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const { id } = await context.params;
    const response = await fetch(
      buildStoreApiUrl(`/v1/store/me/favorites/${id}/`),
      {
        method: "DELETE",
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
            : "Failed to proxy favorite delete request",
      },
      { status: 500 },
    );
  }
}
