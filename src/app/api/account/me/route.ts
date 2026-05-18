import { NextResponse } from "next/server";

import {
  buildAccountApiUrl,
  getAuthorizationHeader,
  toProxyResponse,
} from "../utils";

const CURRENT_ACCOUNT_PATH = "/v1/auth/account/me/";

export async function GET(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const response = await fetch(buildAccountApiUrl(CURRENT_ACCOUNT_PATH), {
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
            : "Failed to proxy current account request",
      },
      { status: 500 },
    );
  }
}
