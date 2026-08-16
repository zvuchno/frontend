type BackendCookie = {
  name: string;
  value: string;
  path?: string;
  expires?: Date;
  maxAge?: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite?: "lax" | "strict" | "none";
};

export function parseBackendSetCookie(cookieString: string): BackendCookie | null {
  const [nameValue, ...attributes] = cookieString.split(";").map((item) => item.trim());

  const separatorIndex = nameValue.indexOf("=");

  if (separatorIndex === -1) {
    return null;
  }

  const cookie: BackendCookie = {
    name: nameValue.slice(0, separatorIndex),
    value: nameValue.slice(separatorIndex + 1),
    httpOnly: false,
    secure: false,
  };

  for (const attribute of attributes) {
    const [rawKey, ...rawValue] = attribute.split("=");
    const key = rawKey.toLowerCase();
    const value = rawValue.join("=");

    switch (key) {
      case "httponly":
        cookie.httpOnly = true;
        break;
      case "secure":
        cookie.secure = true;
        break;
      case "path":
        cookie.path = value;
        break;
      case "max-age":
        {
          const maxAge = Number(value);

          if (Number.isFinite(maxAge)) {
            cookie.maxAge = maxAge;
          }
        }
        break;
      case "expires":
        {
          const expires = new Date(value);

          if (!Number.isNaN(expires.getTime())) {
            cookie.expires = expires;
          }
        }
        break;
      case "samesite":
        {
          const sameSite = value.toLowerCase();

          if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
            cookie.sameSite = sameSite;
          }
        }
        break;
    }
  }

  return cookie;
}
