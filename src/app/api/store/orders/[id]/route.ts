import { NextResponse } from "next/server";

import {
  buildStoreApiUrl,
  getAuthorizationHeader,
  toProxyResponse,
} from "../../utils";

type OrderRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, context: OrderRouteContext) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const { id } = await context.params;
    const response = await fetch(buildStoreApiUrl(`/v1/store/orders/${id}/`), {
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
            : "Failed to proxy order request",
      },
      { status: 500 },
    );
  }
}
