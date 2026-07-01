import { getSession } from "next-auth/react";

export async function getApiAccessToken(): Promise<string> {
  const session = await getSession();
  const accessToken = session?.user?.accessToken;

  if (!accessToken) {
    throw new Error("Authorization token is missing");
  }

  return accessToken;
}

// проверяет наличие дествующего токена, но не блокирует выполнение операций, если токена нет
export const checkAccessToken = async () => {
  let token: string | undefined;

  try {
    token = await getApiAccessToken().catch(() => undefined);
  } catch {
    token = undefined;
  }
  return token;
};
