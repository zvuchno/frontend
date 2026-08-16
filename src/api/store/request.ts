/*import { getApiAccessToken } from "@/api/authToken";

export function createAuthHeaders(token: string, headers?: HeadersInit): Headers {
  const authHeaders = new Headers(headers);
  authHeaders.set("Authorization", `Bearer ${token}`);

  return authHeaders;
}

function getStoreApiErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const responseData = data as {
    detail?: unknown;
    message?: unknown;
    non_field_errors?: unknown;
  };

  if (typeof responseData.detail === "string" && responseData.detail) {
    return responseData.detail;
  }

  if (typeof responseData.message === "string" && responseData.message) {
    return responseData.message;
  }

  if (
    Array.isArray(responseData.non_field_errors) &&
    typeof responseData.non_field_errors[0] === "string"
  ) {
    return responseData.non_field_errors[0];
  }

  return null;
}

async function throwStoreApiError(response: Response): Promise<never> {
  let message = `Store API request failed with status ${response.status}`;
  const responseBody = await response.text();

  if (responseBody) {
    try {
      message =
        getStoreApiErrorMessage(JSON.parse(responseBody)) ?? responseBody;
    } catch {
      message = responseBody;
    }
  }

  throw new Error(message);
}

export async function requestStore<TResponse>(
  path: string,
  init: RequestInit,
): Promise<TResponse> {
  const token = await getApiAccessToken();
  const response = await fetch(path, {
    ...init,
    headers: createAuthHeaders(token, init.headers),
  });

  if (!response.ok) {
    return throwStoreApiError(response);
  }

  return response.json() as Promise<TResponse>;
}

export async function requestStoreWithoutResponse(
  path: string,
  init: RequestInit,
): Promise<void> {
  const token = await getApiAccessToken();
  const response = await fetch(path, {
    ...init,
    headers: createAuthHeaders(token, init.headers),
  });

  if (!response.ok) {
    return throwStoreApiError(response);
  }
}
*/