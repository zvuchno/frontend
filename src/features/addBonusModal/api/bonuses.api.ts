import { authFetchClient } from "@/api/authFetchFromClient/authFetchClient";
import type{ 
  TBonusDetail, 
  TBonusList, 
  TCreateBonusPayload, 
  TCreateBonusResponse, 
  TUpdateBonusPayload 
} from "../model/types";
import { payloadToFormData } from "../utils/payloadToFormData";

const baseUrl = "/api/backend";
const bunusPath = "/v1/store/bonuses";

export const getBonusList = async (): Promise<TBonusList> => {
  const url = `${baseUrl}${bunusPath}`;

  const response = await authFetchClient<TBonusList>(url, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить список бонусов.");

  return response;
};

export async function getDetailBonus({ id }: { id?: number }): Promise<TBonusDetail> {
  const url = `${baseUrl}${bunusPath}/${id}`;

  const response = await authFetchClient<TBonusDetail>(url, {
    method: "GET",
  });

  if (!response) throw new Error("Не удалось получить информацию о бонусе.");

  return response;
};

export async function createBonus(
  payload: TCreateBonusPayload
): Promise<TCreateBonusResponse> {

  const formData = payloadToFormData(payload);

  const url = `${baseUrl}${bunusPath}`;

  const response = await authFetchClient<TCreateBonusResponse>(url, {
    method: "POST",
    body: formData,
  });

  if (!response) throw new Error("Не удалось создать бонус.");

  return response;
};

export async function updateBonus(
  payload: TUpdateBonusPayload,
  bonusId: number
): Promise<TCreateBonusResponse> {

  const formData = payloadToFormData(payload);

  const url = `${baseUrl}${bunusPath}/${bonusId}`;

  const response = await authFetchClient<TCreateBonusResponse>(url, {
    method: "PATCH",
    body: formData,
  });

  if (!response) throw new Error("Не удалось обновить бонус.");

  return response;
};