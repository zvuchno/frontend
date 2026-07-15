import type { NextConfig } from "next";

function getApiImageRemotePattern() {
  const apiBaseUrl = process.env.BASE_API_URL ?? process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!apiBaseUrl) return null;

  try {
    const apiUrl = new URL(apiBaseUrl);

    return {
      protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
      hostname: apiUrl.hostname,
      port: apiUrl.port || undefined,
      pathname: "/media/**",
    };
  } catch (error) {
    console.log("ошибка парсинга BASE_API_URL:", error);
    return null;
  }
}

const dynamicRemotePatterns = getApiImageRemotePattern();

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      
      ...(dynamicRemotePatterns ? [dynamicRemotePatterns] : []),

      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        pathname: "/zvuchno-platform-public/**",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        pathname: "/zvuchno-platform-private/**",
      },
    ],
  },
};

export default nextConfig;
