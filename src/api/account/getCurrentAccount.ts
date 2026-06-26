import { requestAccount } from "./request";
import { type CurrentAccountResponse } from "./types";

const CURRENT_ACCOUNT_PATH = "/api/account/me";

export async function getCurrentAccount(): Promise<CurrentAccountResponse> {
  return requestAccount<CurrentAccountResponse>(CURRENT_ACCOUNT_PATH, {
    method: "GET",
  });
}

export default getCurrentAccount;
