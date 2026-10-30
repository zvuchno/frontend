import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";

import { type TCheckListResponse } from "../model/types";

const baseUrl = "/api/backend";
const checkListPath = "/v1/artists/onboarding-checklist";

export async function getChecklist(): Promise<TCheckListResponse> {
  const response = await authFetchClient<TCheckListResponse>(`${baseUrl}${checkListPath}`, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить checkList");

  return response;
}
