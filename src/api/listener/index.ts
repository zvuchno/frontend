function getListenerApiErrorMessage(data: unknown): string | null {
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

// async function throwListenerApiError(response: Response): Promise<never> {
//   let message = `Listener API request failed with status ${response.status}`;
//   const responseBody = await response.text();

//   if (responseBody) {
//     try {
//       message = getListenerApiErrorMessage(JSON.parse(responseBody)) ?? responseBody;
//     } catch {
//       message = responseBody;
//     }
//   }

//   throw new Error(message);
// }

