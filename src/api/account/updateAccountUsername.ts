import { requestAccount } from "./request";
import {
  UpdateAccountUsernamePayload,
  UpdateAccountUsernameResponse,
} from "./types";

const CURRENT_ACCOUNT_CHANGE_USERNAME_PATH = "/api/account/me/change-username";

export async function updateAccountUsername(
  payload: UpdateAccountUsernamePayload,
  token: string,
): Promise<UpdateAccountUsernameResponse> {
  return requestAccount<UpdateAccountUsernameResponse>(
    CURRENT_ACCOUNT_CHANGE_USERNAME_PATH,
    token,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
}

export default updateAccountUsername;
