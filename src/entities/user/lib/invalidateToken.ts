import { type JWT } from "next-auth/jwt";

export const invalidateToken = (token: JWT): JWT => ({
  ...token,
  id: undefined,
  error: "RefreshAccessTokenError",
});
