import { requestAccount } from "./request";
import { CurrentAccountResponse } from "./types";

const CURRENT_ACCOUNT_PATH = "/api/account/me";

export async function getCurrentAccount(): Promise<CurrentAccountResponse> {
  return requestAccount<CurrentAccountResponse>(CURRENT_ACCOUNT_PATH, {
    method: "GET",
  });
}

export default getCurrentAccount;
