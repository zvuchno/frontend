import { useMutation } from "@tanstack/react-query";

import { manageLabelInvitation } from "../api/managed-invitations.api";
import { type ManageInvitationVariables, type TInvitationResponse } from "./types";

export function useManageInvitation() {
  return useMutation<TInvitationResponse, Error, ManageInvitationVariables>({
    mutationFn: ({ id, email, type }) => manageLabelInvitation(id, email, type),
  });
}
