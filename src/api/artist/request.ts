import { getApiAccessToken } from "@/api/authToken";

function createAuthHeaders(token: string, headers?: HeadersInit): Headers {
  const authHeaders = new Headers(headers);
  authHeaders.set("Authorization", `Bearer ${token}`);

  return authHeaders;
}

async function throwArtistApiError(response: Response): Promise<never> {
  let message = `Artist API request failed with status ${response.status}`;

  try {
    const data = (await response.json()) as { detail?: string };

    if (typeof data.detail === "string" && data.detail.length > 0) {
      message = data.detail;
    }
  } catch {
    const text = await response.text();

    if (text) {
      message = text;
    }
  }

  throw new Error(message);
}

export async function requestArtist<TResponse>(
  path: string,
  init: RequestInit,
): Promise<TResponse> {
  const token = await getApiAccessToken();
  const response = await fetch(path, {
    ...init,
    headers: createAuthHeaders(token, init.headers),
  });

  if (!response.ok) {
    return throwArtistApiError(response);
  }

  return response.json() as Promise<TResponse>;
}
