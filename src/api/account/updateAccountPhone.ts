import { requestAccount } from "./request";
import { UpdateAccountPhonePayload, UpdateAccountPhoneResponse } from "./types";

const CURRENT_ACCOUNT_CHANGE_PHONE_PATH = "/api/account/me/change-phone";

export async function updateAccountPhone(
  payload: UpdateAccountPhonePayload,
  token: string,
): Promise<UpdateAccountPhoneResponse> {
  return requestAccount<UpdateAccountPhoneResponse>(
    CURRENT_ACCOUNT_CHANGE_PHONE_PATH,
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

export default updateAccountPhone;
