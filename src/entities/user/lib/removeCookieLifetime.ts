export const removeCookieLifetime = (setCookie: string): string =>
  setCookie
    .split(";")
    .map((part) => part.trim())
    .filter((part) => {
      const attributeName = part.split("=", 1)[0].toLowerCase();

      return attributeName !== "expires" && attributeName !== "max-age";
    })
    .join("; ");
