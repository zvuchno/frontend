const NO_TRAILING_SLASH_PREFIXES = ["/download-link/", "/cart/me/add"];

export const createBackendPath = (
  path: string[]
): Record<"backendPath" | "pathForMatch", string> => {
  const rawBackendPath = path.join("/");

  const backendPath = NO_TRAILING_SLASH_PREFIXES.some(
    (prefix) => rawBackendPath === prefix || rawBackendPath.startsWith(`${prefix}/`)
  )
    ? rawBackendPath
    : `${rawBackendPath}/`;

  return {
    backendPath: backendPath,
    pathForMatch: backendPath.endsWith("/") ? backendPath : `${backendPath}/`,
  };
};
