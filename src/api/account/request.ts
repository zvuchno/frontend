import { getApiAccessToken } from "@/api/authToken";

function createAuthHeaders(token: string, headers?: HeadersInit): Headers {
  const authHeaders = new Headers(headers);
  authHeaders.set("Authorization", `Bearer ${token}`);

  return authHeaders;
}

async function throwAccountApiError(response: Response): Promise<never> {
  let message = `Account API request failed with status ${response.status}`;

  try {
    const data = (await response.json()) as {
      detail?: string;
      message?: string;
      non_field_errors?: string[];
    };

    if (typeof data.detail === "string" && data.detail.length > 0) {
      message = data.detail;
    } else if (typeof data.message === "string" && data.message.length > 0) {
      message = data.message;
    } else if (
      Array.isArray(data.non_field_errors) &&
      typeof data.non_field_errors[0] === "string"
    ) {
      message = data.non_field_errors[0];
    }
  } catch {
    const text = await response.text();

    if (text) {
      message = text;
    }
  }

  throw new Error(message);
}

export async function requestAccount<TResponse>(
  path: string,
  init: RequestInit,
): Promise<TResponse> {
  const token = await getApiAccessToken();
  const response = await fetch(path, {
    ...init,
    headers: createAuthHeaders(token, init.headers),
  });

  if (!response.ok) {
    return throwAccountApiError(response);
  }

  return response.json() as Promise<TResponse>;
}

export async function requestAccountWithoutResponse(
  path: string,
  init: RequestInit,
): Promise<void> {
  const token = await getApiAccessToken();
  const response = await fetch(path, {
    ...init,
    headers: createAuthHeaders(token, init.headers),
  });

  if (!response.ok) {
    return throwAccountApiError(response);
  }
}
