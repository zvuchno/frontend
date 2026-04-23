import { requestAccountWithoutResponse } from "./request";
import {
  UpdateAccountPasswordPayload,
  UpdateAccountPasswordResponse,
} from "./types";

const CURRENT_ACCOUNT_CHANGE_PASSWORD_PATH = "/api/account/me/change-password";

export async function updateAccountPassword(
  payload: UpdateAccountPasswordPayload,
  token: string,
): Promise<UpdateAccountPasswordResponse> {
  return requestAccountWithoutResponse(
    CURRENT_ACCOUNT_CHANGE_PASSWORD_PATH,
    token,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
}

export default updateAccountPassword;
