import { getSession } from "next-auth/react";

export async function getApiAccessToken(): Promise<string> {
  const session = await getSession();
  const accessToken = session?.user?.accessToken;

  if (!accessToken) {
    throw new Error("Authorization token is required");
  }

  return accessToken;
}
