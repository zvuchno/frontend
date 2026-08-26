export { useUserStore } from "./store/useUserStore";
export type {
  TNewUserResponse,
  TNewListenerRequest,
  TNewArtistRequest,
  UserDataProps,
  TRegisterRequest,
  TProfileType,
  TVerifyEmailRequest
} from "./model/types";
export {
  verifyEmail,
  resendEmailForVerify,
  resetPassword,
  resetPasswordVerify,
  resetPasswordConfirm,
} from "./api/api";

export { useBecomeArtist } from "./model/useBecomeArtist";

export { type AuthResponse } from "./model/types.serverCookie";
export { useSignOut } from "./model/useSignOut";
export { invalidateToken } from "./lib/invalidateToken";

export { parseBackendSetCookie } from "./lib/parseBackendSetCookie";

export { getCookiePair } from "./lib/getCookiePair";
export { setBackendCookieHeader } from "./lib/setBackendCookieHeader";
export { setCsrfHeaders } from "./lib/setCsrfHeaders";
export { getUnauthorizedSessionResponse } from "./lib/getUnauthorizedSessionResponse";
export { createBackendPath } from "./lib/createBackendPath";
