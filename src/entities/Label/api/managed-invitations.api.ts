import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TInvitationResponse } from "../model/types";

const baseURL = "/api/backend";
const LABEL_MANAGED_ARTISTS_PATH = `${baseURL}/v1/artists/me/managed-profiles`;

export async function manageLabelInvitation(
  id: string,
  email?: string,
  type?: "resend" | "revoke"
): Promise<TInvitationResponse> {
  const currentPath =
    type === "resend"
      ? `${LABEL_MANAGED_ARTISTS_PATH}/${id}/claim-invitation/resend/`
      : type === "revoke"
        ? `${LABEL_MANAGED_ARTISTS_PATH}/${id}/claim-invitation/revoke/`
        : `${LABEL_MANAGED_ARTISTS_PATH}/${id}/claim-invitation/`;

  const initRequest = {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await authFetchClient<TInvitationResponse>(currentPath, initRequest);

  if (!response) {
    throw new Error("Не отправить приглашение");
  }

  return response;
}
