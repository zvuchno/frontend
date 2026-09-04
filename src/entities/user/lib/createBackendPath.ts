//const NO_TRAILING_SLASH_PREFIXES = ["v1/store/me/purchased-music"];

export const createBackendPath = (
  path: string[]
): Record<"backendPath" | "pathForMatch", string> => {
  const rawBackendPath = path.join("/");

  // Проверяем, попадает ли путь под исключение И при этом НЕ является «детальным» ресурсом
  // const isCollectionPath = NO_TRAILING_SLASH_PREFIXES.some(
  //   (prefix) => rawBackendPath === prefix || rawBackendPath.startsWith(`${prefix}/`)
  // );

  const backendPath = !rawBackendPath.includes('/download-link/')
    ? rawBackendPath
    : rawBackendPath.endsWith('/') ? rawBackendPath : `${rawBackendPath}/`;

  // const backendPath = NO_TRAILING_SLASH_PREFIXES.some(
  //   (prefix) => rawBackendPath === prefix || rawBackendPath.startsWith(`${prefix}/`)
  // )
  //   ? rawBackendPath
  //   : `${rawBackendPath}/`;

  return {
    backendPath: backendPath,
    pathForMatch: backendPath.endsWith("/") ? backendPath : `${backendPath}/`,
  };
};
