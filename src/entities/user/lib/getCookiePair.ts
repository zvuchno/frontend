export function getCookiePair(setCookie: string): [string, string] | null {
  const firstPart = setCookie.split(";", 1)[0];
  const separator = firstPart.indexOf("=");

  if (separator === -1) return null;

  return [firstPart.slice(0, separator), firstPart.slice(separator + 1)];
}
