import { NextResponse } from "next/server";

export const getUnauthorizedSessionResponse = (
  requiresSession: boolean,
  isFrontendAuthenticated: boolean
): NextResponse | null => {
  if (!requiresSession && isFrontendAuthenticated) return null;

  return NextResponse.json(
    { error: "Session expired" },
    {
      status: 401,
      headers: {
        "x-session-expired": "1",
      },
    }
  );
};
