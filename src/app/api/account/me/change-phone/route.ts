import { NextResponse } from "next/server";

import {
  buildAccountApiUrl,
  getAuthorizationHeader,
  toProxyResponse,
} from "../../utils";

const CURRENT_ACCOUNT_CHANGE_PHONE_PATH = "/v1/auth/account/me/change-phone/";

export async function PATCH(request: Request) {
  try {
    const authorizationHeader = getAuthorizationHeader(request);

    if (authorizationHeader instanceof NextResponse) {
      return authorizationHeader;
    }

    const payload = await request.json();
    const response = await fetch(
      buildAccountApiUrl(CURRENT_ACCOUNT_CHANGE_PHONE_PATH),
      {
        method: "PATCH",
        headers: {
          Authorization: authorizationHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
            : "Failed to proxy account phone update request",
      },
      { status: 500 },
    );
  }
}
